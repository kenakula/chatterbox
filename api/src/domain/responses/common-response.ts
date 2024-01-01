export interface ICommonResponse<T> {
  isArray: boolean;
  path: string;
  duration: string;
  method: string;
  statusCode: number;
  data: T;
}
