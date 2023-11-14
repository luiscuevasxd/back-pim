import {
  IPagination,
  IPaginationFilter,
  IProduct,
  IProductFilter,
  Statistic
} from '../../entities';

export interface IProductService {
  getAll(args: IProductFilter & IPaginationFilter): Promise<IPagination<IProduct>>;
  getOne(id: string): Promise<IProduct | null>;
  update(args: Partial<IProduct> & { id: string }): Promise<Partial<IProduct> | null>;
  create(args: Omit<IProduct, 'id'>): Promise<IProduct>;
  delete(id: string): Promise<void>;
  changeStock(id: string): Promise<void>;
  statistics(): Promise<Statistic>;
}
