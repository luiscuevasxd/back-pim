import { IProductStock } from '../../entities';

export interface IProductStockService {
  getAll(productId: string): Promise<IProductStock[]>;
}
