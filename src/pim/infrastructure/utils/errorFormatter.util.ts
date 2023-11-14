import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ErrorMessage } from '../../core';
import { ApiError } from './ApiError.util';
import { logger } from './LogFormatter.util';

export function errorFormatter(error: FastifyError, _: FastifyRequest, reply: FastifyReply) {
  if (error instanceof ApiError) {
    logger.error('error-formatter', {
      statusCode: error.statusCode,
      errorCode: error.errorCode,
      error_message: error.message,
      errorDetails: error.errorDetails
    });
    return reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      errorCode: error.errorCode,
      error_message: error.message,
      errorDetails: error.errorDetails
    });
  }

  logger.error('error-formatter', {
    statusCode: error.statusCode,
    error_message: error.message
  });
  reply.status(500).send(error);
}

export function errorFormatterService(error: any) {
  if (error && error.cause) {
    const errorCode = error.cause.errorCode as string;
    const melonnErrorCodes = ErrorMessage as { [key: string]: string };

    return new ApiError(
      error.message,
      (melonnErrorCodes[errorCode] as string) ?? ErrorMessage.GENERIC,
      error.cause.statusCode,
      error.cause.errorDetails
    );
  }
  return new Error(error);
}
