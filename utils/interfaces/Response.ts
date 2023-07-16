export interface ResponseData {
  code: number;
}

export interface ResponseErrorData extends ResponseData {
  message: string;
}

export interface ResponseSuccessData extends ResponseData {
  message: string;
  data: Record<"link" | "id", string>;
}
