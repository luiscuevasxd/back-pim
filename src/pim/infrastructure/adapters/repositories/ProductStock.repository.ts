import { WithId } from 'mongodb';
import { IProductStock, IProductStockRepository } from '../../../core';
import { Database } from '../databases';

export class ProductStockRepository implements IProductStockRepository {
  constructor(private readonly database: Database) {}

  async getAllByProductId(productId: string): Promise<WithId<IProductStock>[]> {
    return this.database
      .getCollection<IProductStock>('productStocks')
      .find({ productId })
      .toArray();
  }

  async findLastByProductId(productId: string): Promise<IProductStock | null> {
    const data = await this.database
      .getCollection<IProductStock>('productStocks')
      .find({
        productId
      })
      .sort({ createdAt: -1 })
      .limit(1)
      .toArray();

    return data?.[0] || null;
  }

  async create(args: Omit<IProductStock, 'id'>): Promise<IProductStock> {
    const date = new Date();

    const { insertedId } = await this.database
      .getCollection<Omit<IProductStock, 'id'>>('productStocks')
      .insertOne({ ...args, createdAt: date, updatedAt: date });

    return { id: String(insertedId), ...args };
  }

  async deleteManyByProductId(productId: string): Promise<void> {
    await this.database
      .getCollection<Omit<IProductStock, 'id'>>('productStocks')
      .deleteMany({ productId });
  }
}
