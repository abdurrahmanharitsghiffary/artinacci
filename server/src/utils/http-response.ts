import { ApiResponse } from '@app/types/api';

export class HttpResponse<T> implements ApiResponse<T> {
  constructor(
    public data: T,
    public statusCode: number,
    public message?: string,
    public errors?: any[]
  ) {}
}
