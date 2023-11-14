import { ProductService, ProductStockService } from '../core';
import {
  Database,
  ProductController,
  ProductRepository,
  ProductStockController,
  ProductStockRepository
} from './adapters';
import { envVariableValidator } from './utils';

// Variables
const envVariables = {
  DATABASE_URL: process.env.DATABASE_URL ?? 'DATABASE_URL'
};

// Methods
envVariableValidator(envVariables);

// Databases
const database = Database.getInstance();

// Repositories
const productRepository = new ProductRepository(database);
const productStockRepository = new ProductStockRepository(database);

// Services
const productService = new ProductService(productRepository, productStockRepository);
const productStockService = new ProductStockService(productStockRepository);

// Controllers
export const productController = new ProductController(productService);
export const productStockController = new ProductStockController(productStockService);
