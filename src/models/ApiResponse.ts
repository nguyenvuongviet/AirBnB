export type ApiResponse<T = any> = {
  statusCode: number;
  content: T;
  dateTime: Date;
};
