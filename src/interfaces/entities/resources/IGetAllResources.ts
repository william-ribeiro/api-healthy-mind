export interface IGetAllResources {
  userId: string;
  query?: {
    page?: number;
  };
  skip?: number;
}
