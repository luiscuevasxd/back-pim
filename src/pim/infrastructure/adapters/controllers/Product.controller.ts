import { FastifyReply, FastifyRequest } from 'fastify';
import {
  IPagination,
  IPaginationFilter,
  IProduct,
  IProductController,
  IProductService,
  Statistic,
  StatusCodes
} from '../../../core';

export class ProductController implements IProductController {
  constructor(private readonly productService: IProductService) {}

  async getAll(
    req: FastifyRequest<{ Querystring: IProduct & IPaginationFilter }>
  ): Promise<IPagination<IProduct>> {
    return this.productService.getAll(req.query);
  }

  async getOne(req: FastifyRequest<{ Params: Pick<IProduct, 'id'> }>): Promise<IProduct | null> {
    return this.productService.getOne(req.params.id);
  }

  async create(req: FastifyRequest<{ Body: Omit<IProduct, 'id'> }>): Promise<IProduct> {
    return this.productService.create(req.body);
  }

  async update(
    req: FastifyRequest<{ Params: Pick<IProduct, 'id'>; Body: Partial<IProduct> }>
  ): Promise<Partial<IProduct> | null> {
    return this.productService.update({
      id: req.params.id,
      ...req.body
    });
  }

  async delete(
    req: FastifyRequest<{ Params: Pick<IProduct, 'id'> }>,
    reply: FastifyReply
  ): Promise<void> {
    await this.productService.delete(req.params.id);

    reply.status(StatusCodes.NotContent);
    reply.send();
  }

  async changeStatus(
    req: FastifyRequest<{ Params: Pick<IProduct, 'id'> }>,
    reply: FastifyReply
  ): Promise<void> {
    await this.productService.changeStock(req.params.id);

    reply.status(StatusCodes.NotContent);
    reply.send();
  }

  async statistics(): Promise<Statistic> {
    return this.productService.statistics();
  }
}
