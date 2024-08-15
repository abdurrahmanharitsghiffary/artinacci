export type ApiResponse<T> = {
  statusCode: number;
  message?: string;
  code?: string;
  data: T;
  errors?: any[];
};
