import { WithId } from 'mongodb';
import { IProductStock } from '../../entities';

export interface IProductStockRepository {
  getAllByProductId(productId: string): Promise<WithId<IProductStock>[]>;
  findLastByProductId(productId: string): Promise<IProductStock | null>;
  create(args: Omit<IProductStock, 'id'>): Promise<IProductStock>;
  deleteManyByProductId(id: string): Promise<void>;
}
