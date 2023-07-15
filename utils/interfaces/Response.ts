export interface ResponseData {
  code: number;
}
export interface ResponseErrorData extends ResponseData {
  message: string;
}
