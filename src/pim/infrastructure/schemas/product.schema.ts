import { SchemaCompiler, defaultQueryString } from './schema';

export const allProductSchema: SchemaCompiler['schema'] = {
  querystring: {
    type: 'object',
    properties: {
      ...defaultQueryString,
      searchValue: { type: 'string' },
      category: { enum: ['HOUSEHOLD', 'GAME', 'ACCESSORY', 'SHOES', 'OFFICE', 'ELECTRONICS'] },
      status: { enum: ['PUBLISH', 'SCHEDULED', 'INACTIVE'] },
      typeStock: { enum: ['IN_STOCK', 'OUT_OF_STOCK'] }
    }
  }
};

export const productByIdSchema: SchemaCompiler['schema'] = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
    }
  }
};

export const createProductSchema: SchemaCompiler['schema'] = {
  body: {
    type: 'object',
    required: ['name', 'category', 'sku', 'image', 'price', 'stock', 'typeStock'],
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      category: { enum: ['HOUSEHOLD', 'GAME', 'ACCESSORY', 'SHOES', 'OFFICE', 'ELECTRONICS'] },
      sku: { type: 'string' },
      image: { type: 'string' },
      tags: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      price: { type: 'number' },
      stock: { type: 'number' },
      typeStock: { enum: ['IN_STOCK', 'OUT_OF_STOCK'] },
      status: { enum: ['PUBLISH', 'SCHEDULED', 'INACTIVE'] }
    }
  }
};

export const updateProductSchema: SchemaCompiler['schema'] = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' }
    }
  },
  body: {
    type: 'object',
    properties: (createProductSchema.body as any)?.properties ?? {}
  }
};
