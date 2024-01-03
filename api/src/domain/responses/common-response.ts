export interface ICommonResponse<T> {
  count: number;
  path: string;
  duration: string;
  method: string;
  statusCode: number;
  data: T;
}
