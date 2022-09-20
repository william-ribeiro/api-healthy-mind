export interface IPayload {
  sub: string;
  exp: number;
  roleId: number;
}

export interface IToken {
  id: string;
  type: string;
  roleId: number;
}
