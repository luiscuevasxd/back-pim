import { SchemaCompiler } from './schema';

export const allProductStockSchema: SchemaCompiler['schema'] = {
  querystring: {
    type: 'object',
    required: ['productId'],
    properties: {
      productId: { type: 'string' }
    }
  }
};
