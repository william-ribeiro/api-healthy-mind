export interface IUpdateResource {
  resourceId: number;
  userId: string;
  payload: {
    category?: string;
    title?: string;
    description?: string;
    enabled?: boolean;
  };
}
