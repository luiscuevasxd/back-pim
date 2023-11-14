export type IProductStock = {
  id: string;
  productId: string;
  stockOld: number;
  stockCurrent: number;
  createdAt?: Date;
  updatedAt?: Date;
};
