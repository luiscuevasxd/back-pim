import { FastifySchema, RouteShorthandOptions } from 'fastify';
import { PAGINATION } from '../utils';

export interface SchemaCompiler extends RouteShorthandOptions {
  schema: FastifySchema;
}

export const defaultQueryString = {
  page: { type: 'integer', minimum: 0, default: PAGINATION.DEFAULT_PAGE },
  per_page: {
    type: 'integer',
    minimum: 0,
    maximum: PAGINATION.MAX_PER_PAGE,
    default: PAGINATION.PER_PAGE
  },
  sort_order: { enum: ['desc', 'asc'] },
  sort_field: { type: 'string' }
};

export const commonParamId = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'integer', minimum: 1 }
  }
};

export function addSortFields(sortFields: string[], queryStringProperties?: unknown) {
  return {
    type: 'object',
    properties: {
      ...defaultQueryString,
      ...(queryStringProperties || {}),
      ...(sortFields?.length && { sort_field: { enum: sortFields } })
    }
  };
}
