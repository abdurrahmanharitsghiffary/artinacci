import { AxiosError, isAxiosError } from "axios";

export const getAxiosErrMessage = (axiosError: AxiosError) => {
  let message = "Something went wrong";
  if (isAxiosError(axiosError)) {
    message = (axiosError?.response?.data as any)?.message;
  }
  return message;
};
