import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { IPaginationFilter, IProduct } from '../../core';
import { productController } from '../di';
import {
  allProductSchema,
  createProductSchema,
  productByIdSchema,
  updateProductSchema
} from '../schemas';
import productStockRoutes from './productStock.route';

export default function productRoutes(
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _opts: { prefix: string },
  next: (err?: Error) => void
) {
  fastify.get('/', {
    schema: allProductSchema,
    handler: (req: FastifyRequest<{ Querystring: IProduct & IPaginationFilter }>) =>
      productController.getAll(req)
  });

  fastify.get('/:id', {
    schema: productByIdSchema,
    handler: (req: FastifyRequest<{ Params: Pick<IProduct, 'id'> }>) =>
      productController.getOne(req)
  });

  fastify.patch('/:id', {
    schema: updateProductSchema,
    handler: (req: FastifyRequest<{ Params: Pick<IProduct, 'id'>; Body: Partial<IProduct> }>) =>
      productController.update(req)
  });

  fastify.post('/', {
    schema: createProductSchema,
    handler: (req: FastifyRequest<{ Body: IProduct }>) => productController.create(req)
  });

  fastify.delete('/:id', {
    schema: productByIdSchema,
    handler: (req: FastifyRequest<{ Params: Pick<IProduct, 'id'> }>, reply: FastifyReply) =>
      productController.delete(req, reply)
  });

  fastify.post('/change-stock/:id', {
    schema: productByIdSchema,
    handler: (req: FastifyRequest<{ Params: Pick<IProduct, 'id'> }>, reply: FastifyReply) =>
      productController.changeStatus(req, reply)
  });

  fastify.get('/statistics/all', {
    handler: () => productController.statistics()
  });

  fastify.register(productStockRoutes, {
    prefix: '/:productId/stocks'
  });

  next();
}
