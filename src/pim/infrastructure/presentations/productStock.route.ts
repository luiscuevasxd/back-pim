import { FastifyInstance, FastifyRequest } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { IProductStock } from '../../core';
import { productStockController } from '../di';
import { allProductStockSchema } from '../schemas';

export default function productStockRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.get('/', {
    schema: allProductStockSchema,
    handler: (
      req: FastifyRequest<{
        Params: Pick<IProductStock, 'productId'>;
      }>
    ) => productStockController.getAll(req)
  });

  next();
}
