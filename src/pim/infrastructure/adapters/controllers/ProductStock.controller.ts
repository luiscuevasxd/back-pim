import { FastifyRequest } from 'fastify';
import { IProductStock, IProductStockController, IProductStockService } from '../../../core';

export class ProductStockController implements IProductStockController {
  constructor(private readonly productService: IProductStockService) {}

  async getAll(
    req: FastifyRequest<{
      Params: Pick<IProductStock, 'productId'>;
    }>
  ): Promise<IProductStock[]> {
    return this.productService.getAll(req.params.productId);
  }
}
