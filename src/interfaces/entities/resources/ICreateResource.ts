export interface ICreateResource {
  payload: {
    userId: string;
    category: string;
    title: string;
    description: string;
  };
}
