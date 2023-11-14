import { logger } from '../../infrastructure';
import {
  ErrorCode,
  ErrorMessage,
  IPagination,
  IPaginationFilter,
  IProduct,
  IProductFilter,
  IProductService,
  IProductStockRepository,
  Statistic,
  Status,
  StatusCodes,
  TypeStock
} from '../domain';
import { IProductRepository } from '../domain/ports/repositories/IProduct.repository';
import { handleError } from './utils';

export class ProductService implements IProductService {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly productStockRepository: IProductStockRepository
  ) {}

  async getAll({
    per_page,
    page,
    ...filters
  }: IProductFilter & IPaginationFilter): Promise<IPagination<IProduct>> {
    const [data, count] = await Promise.all([
      this.productRepository.getAll({
        filters,
        pagination: {
          page,
          per_page
        }
      }),
      this.productRepository.count(filters)
    ]);

    return {
      data,
      meta_data: {
        count,
        page,
        per_page
      }
    };
  }

  async getOne(id: string): Promise<IProduct | null> {
    const product = await this.productRepository.getOne(id);

    if (!product)
      throw handleError(
        ErrorMessage.PRODUCT_NOT_FOUND,
        ErrorCode.PRODUCT_NOT_FOUND,
        StatusCodes.BadRequest
      );

    return product;
  }

  async update(args: Partial<IProduct> & { id: string }): Promise<Partial<IProduct> | null> {
    const product = await this.productRepository.getOne(args.id);

    if (!product)
      throw handleError(
        ErrorMessage.PRODUCT_NOT_FOUND,
        ErrorCode.PRODUCT_NOT_FOUND,
        StatusCodes.BadRequest
      );

    await this.productRepository.update(args);

    if (typeof args.stock === 'number')
      await this.productStockRepository.create({
        productId: args.id,
        stockOld: product.stock,
        stockCurrent: args.stock
      });

    return { ...product, ...args };
  }

  async create(args: Omit<IProduct, 'id'>): Promise<IProduct> {
    const productExists = await this.productRepository.find({ sku: args.sku });

    if (productExists)
      throw handleError(
        ErrorMessage.PRODUCT_ALREADY_EXISTS,
        ErrorCode.PRODUCT_ALREADY_EXISTS,
        StatusCodes.BadRequest
      );

    logger.info('args', { args });

    const product = await this.productRepository.create(args);

    await this.productStockRepository.create({
      productId: product.id,
      stockOld: 0,
      stockCurrent: args.stock
    });

    return product;
  }

  async delete(id: string): Promise<void> {
    const product = await this.productRepository.getOne(id);

    if (!product)
      throw handleError(
        ErrorMessage.PRODUCT_NOT_FOUND,
        ErrorCode.PRODUCT_NOT_FOUND,
        StatusCodes.BadRequest
      );

    const productStock = await this.productStockRepository.findLastByProductId(id);
    logger.info('hello world', { productStock });
    if (productStock?.stockCurrent)
      throw handleError(
        ErrorMessage.PRODUCT_HAVE_STOCK,
        ErrorCode.PRODUCT_HAVE_STOCK,
        StatusCodes.BadRequest
      );

    if (productStock) await this.productStockRepository.deleteManyByProductId(id);

    await this.productRepository.delete(id);
  }

  async changeStock(id: string): Promise<void> {
    const product = await this.productRepository.getOne(id);

    if (!product)
      throw handleError(
        ErrorMessage.PRODUCT_NOT_FOUND,
        ErrorCode.PRODUCT_NOT_FOUND,
        StatusCodes.BadRequest
      );

    await this.productRepository.update({
      id,
      typeStock:
        product.typeStock === TypeStock.IN_STOCK ? TypeStock.OUT_OF_STOCK : TypeStock.IN_STOCK
    });
  }

  async statistics(): Promise<Statistic> {
    const totalStatus = await this.productRepository.totalPriceProductByStatus();
    const totalStock = await this.productRepository.totalPriceProductByStock();

    return {
      [TypeStock.IN_STOCK]: totalStock?.[0],
      [Status.PUBLISH]: totalStatus?.find(({ _id }) => _id === Status.PUBLISH),
      [Status.INACTIVE]: totalStatus?.find(({ _id }) => _id === Status.INACTIVE),
      [Status.SCHEDULED]: totalStatus?.find(({ _id }) => _id === Status.SCHEDULED)
    };
  }
}
