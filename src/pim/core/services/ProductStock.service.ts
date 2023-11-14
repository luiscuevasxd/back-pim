import { IProductStock, IProductStockRepository, IProductStockService } from '../domain';

export class ProductStockService implements IProductStockService {
  constructor(private readonly productStockRepository: IProductStockRepository) {}
  async getAll(productId: string): Promise<IProductStock[]> {
    const productStocks = await this.productStockRepository.getAllByProductId(productId);

    return productStocks as unknown as IProductStock[];
  }
}
