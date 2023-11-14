import { ValidationResult } from 'fastify';
import { FastifySchemaValidationError } from 'fastify/types/schema';

export function schemaErrorFormatter(errors: FastifySchemaValidationError[], dataVar: string) {
  const [error] = errors as ValidationResult[];
  error.message = error.message || '';

  const path = (error.instancePath ?? '').replace('/', '.').replace(/\/(\d)/, '[$1]');

  if (error.keyword === 'enum') {
    const values = error.params.allowedValues as string[];
    error.message += `: ${values.join(', ')}`;
  }

  return new Error(`${dataVar}${path} ${error.message.replace(/"/g, "'")}`);
}
