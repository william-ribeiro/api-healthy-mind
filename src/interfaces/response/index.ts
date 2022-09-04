export interface IResponseLocals {
  ip?: string;
  id?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface IPaginate<T> {
  response: any;
  total: number;
  count: number;
  page: number;
  perPage: number;
  totalPages: number;
  hasNext: boolean;
}
