import { Document, ObjectId, WithId } from 'mongodb';
import {
  IPaginationFilter,
  IProduct,
  IProductFilter,
  IProductRepository,
  TypeStock
} from '../../../core';
import { Database } from '../databases';

export class ProductRepository implements IProductRepository {
  constructor(private readonly database: Database) {}

  async getAll(args: {
    filters: IProductFilter;
    pagination: IPaginationFilter;
  }): Promise<WithId<IProduct>[]> {
    const { filters, pagination } = args;
    return this.database
      .getCollection<IProduct>('products')
      .find({
        ...(filters.searchValue && {
          $or: [
            { name: new RegExp(filters.searchValue, 'i') },
            { sku: new RegExp(filters.searchValue, 'i') },
            { description: new RegExp(filters.searchValue, 'i') }
          ]
        }),
        ...(filters?.category ? { category: new RegExp(filters.category, 'i') } : {}),
        ...(filters?.status ? { status: new RegExp(filters.status, 'i') } : {}),
        ...(filters?.typeStock ? { typeStock: new RegExp(filters.typeStock, 'i') } : {})
      })
      .skip(pagination.page * pagination.per_page)
      .limit(pagination.per_page)
      .toArray();
  }

  async count(filters: IProductFilter): Promise<number> {
    return this.database.getCollection('products').countDocuments({
      ...(filters.searchValue && {
        $or: [
          { name: new RegExp(filters.searchValue, 'i') },
          { sku: new RegExp(filters.searchValue, 'i') },
          { description: new RegExp(filters.searchValue, 'i') }
        ]
      }),
      ...(filters?.category ? { category: new RegExp(filters.category, 'i') } : {}),
      ...(filters?.status ? { status: new RegExp(filters.status, 'i') } : {}),
      ...(filters?.typeStock ? { typeStock: new RegExp(filters.typeStock, 'i') } : {})
    });
  }

  async getOne(id: IProduct['id']): Promise<IProduct | null> {
    const data = await this.database
      .getCollection<IProduct>('products')
      .findOne({ _id: new ObjectId(id) });

    return data
      ? {
          ...data,
          id: String(data?._id)
        }
      : null;
  }

  async find(args: Partial<IProduct>): Promise<IProduct | null> {
    const data = await this.database.getCollection<IProduct>('products').findOne({ sku: args.sku });

    return data
      ? {
          ...data,
          id: String(data?._id)
        }
      : null;
  }

  async update(args: Partial<IProduct> & { id: string }): Promise<Partial<IProduct> | null> {
    const { id, ...rest } = args;

    const { value } = await this.database.getCollection<IProduct>('products').findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...rest,
          updatedAt: new Date()
        }
      }
    );

    return {
      id: String(id),
      ...value
    };
  }

  async create(args: Omit<IProduct, 'id'>): Promise<IProduct> {
    const date = new Date();

    const { insertedId } = await this.database
      .getCollection<Omit<IProduct, 'id'>>('products')
      .insertOne({ ...args, createdAt: date, updatedAt: date });

    return { id: String(insertedId), ...args };
  }

  async delete(id: IProduct['id']): Promise<void> {
    await this.database
      .getCollection<Omit<IProduct, 'id'>>('products')
      .deleteOne({ _id: new ObjectId(id) });
  }

  async totalPriceProductByStatus(): Promise<Document[]> {
    return this.database
      .getCollection<IProduct>('products')
      .aggregate([
        {
          $group: {
            _id: '$status',
            totalPrice: { $sum: '$price' },
            totalProduct: { $sum: 1 }
          }
        }
      ])
      .toArray();
  }

  async totalPriceProductByStock(): Promise<Document[]> {
    return this.database
      .getCollection<IProduct>('products')
      .aggregate([
        {
          $match: {
            typeStock: TypeStock.IN_STOCK
          }
        },
        {
          $group: {
            _id: '$typeStock',
            totalStock: { $sum: '$stock' },
            totalProduct: { $sum: 1 }
          }
        }
      ])
      .toArray();
  }
}
