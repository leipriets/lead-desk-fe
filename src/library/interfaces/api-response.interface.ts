export interface ApiResponse<T = any> {
  statusCode: number;
  message: string;
  data?: T;
  errors?: Record<string, string | string[]>;
}
