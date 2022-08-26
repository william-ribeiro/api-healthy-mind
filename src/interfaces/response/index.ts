export interface IResponseLocals {
  ip?: string;
  id?: string;
}

export interface IPaginate<T> {
  response: T[];
  total: number;
  count: number;
  page: number;
  perPage: number;
  totalPages: number;
  hasNext: boolean;
}
