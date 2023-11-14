import { ApiError, logger } from '../../../infrastructure';
import { ErrorCode, StatusCodes } from '../../domain';

export function handleError(
  message: string,
  errorCode: ErrorCode,
  statusCode: StatusCodes,
  errorDetails?: unknown,
  error?: any
): Error {
  logger.error('handleError', {
    error_message: error?.message ?? message,
    errorCode: error?.code ?? errorCode,
    statusCode: error?.statusCode ?? statusCode ?? StatusCodes.ServiceUnavailable,
    errorDetails,
    ...(error && {
      error: {
        error_message: error?.message,
        data: error?.response?.data
      }
    })
  });

  return new ApiError(
    error?.message ?? message,
    error?.code ?? errorCode,
    error?.response?.status ?? statusCode ?? StatusCodes.ServiceUnavailable,
    errorDetails
      ? {
          ...errorDetails,
          ...(error && {
            error: {
              error_message: error?.message,
              data: error?.response?.data
            }
          })
        }
      : null
  );
}
