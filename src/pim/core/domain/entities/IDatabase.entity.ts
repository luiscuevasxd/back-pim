import { Collection } from 'mongodb';
import { IProduct } from './IProduct.entity';
import { IProductStock } from './IProductStock.entity';

export type ICollections = {
  products: Collection<IProduct>;
  productStocks: Collection<IProductStock>;
};
