import { FastifyReply, FastifyRequest } from 'fastify';
import { IPagination, IPaginationFilter, IProduct, Statistic } from '../../entities';

export interface IProductController {
  getAll(
    req: FastifyRequest<{
      Querystring: IProduct & IPaginationFilter;
    }>
  ): Promise<IPagination<IProduct>>;
  getOne(req: FastifyRequest<{ Params: Pick<IProduct, 'id'> }>): Promise<IProduct | null>;
  update(args: Partial<IProduct> & { id: string }): Promise<Partial<IProduct> | null>;
  create(req: FastifyRequest<{ Body: IProduct }>): Promise<IProduct>;
  delete(req: FastifyRequest<{ Params: Pick<IProduct, 'id'> }>, reply: FastifyReply): Promise<void>;
  changeStatus(
    req: FastifyRequest<{ Params: Pick<IProduct, 'id'> }>,
    reply: FastifyReply
  ): Promise<void>;
  statistics(): Promise<Statistic>;
}
