export class ApiError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
  }
}

export const api = async (input: string, init?: RequestInit) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + input, {
      ...init,
      headers: {
        "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_CLIENT_URL ?? "",
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });

    const data = await response.json();

    if (response.status >= 400)
      throw new ApiError(data?.message, { cause: data });
    return data;
  } catch (err) {
    throw err;
  }
};
