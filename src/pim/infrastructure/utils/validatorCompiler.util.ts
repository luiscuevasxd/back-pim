import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { FastifySchema } from 'fastify';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';

const ajv = new Ajv({
  removeAdditional: 'all',
  useDefaults: true,
  coerceTypes: 'array'
});

addFormats(ajv);

export const validatorCompiler = ({
  schema
}: FastifyRouteSchemaDef<FastifySchema & { validate: any }>) =>
  schema.validate ? (data: any) => schema.validate(data) : ajv.compile(schema);
