export type ApiResponse<T = any> = {
  statusCode: number;
  content: T;
  dateTime: Date;
};

export type Content<T = any> = {
  user: T;
  token: string;
};
