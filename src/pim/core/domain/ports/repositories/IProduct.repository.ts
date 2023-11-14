import { Document, WithId } from 'mongodb';
import { IPaginationFilter, IProduct, IProductFilter } from '../../entities';

export interface IProductRepository {
  getAll(args: {
    filters: IProductFilter;
    pagination: IPaginationFilter;
  }): Promise<WithId<IProduct>[]>;
  count(filters: IProductFilter): Promise<number>;
  find(args: Partial<IProduct>): Promise<IProduct | null>;
  getOne(id: string): Promise<IProduct | null>;
  update(args: Partial<IProduct> & { id: string }): Promise<Partial<IProduct> | null>;
  create(args: Omit<IProduct, 'id'>): Promise<IProduct>;
  delete(id: string): Promise<void>;
  totalPriceProductByStatus(): Promise<Document[]>;
  totalPriceProductByStock(): Promise<Document[]>;
}
