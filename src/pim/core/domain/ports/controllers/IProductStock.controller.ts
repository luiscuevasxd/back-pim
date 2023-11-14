import { FastifyRequest } from 'fastify';
import { IProductStock } from '../../entities';

export interface IProductStockController {
  getAll(
    req: FastifyRequest<{
      Params: Pick<IProductStock, 'productId'>;
    }>
  ): Promise<IProductStock[]>;
}
