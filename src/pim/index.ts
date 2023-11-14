import awsLambdaFastify from '@fastify/aws-lambda';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import app from './app';
import { Database } from './infrastructure';
import { logger } from './infrastructure/utils';

dayjs.extend(utc);
dayjs.extend(timezone);

const proxy = awsLambdaFastify(app);
const lambdaHandler = proxy;

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  logger.addContext(context);
  logger.info('event', { event });

  //DB CONNECTION
  await Database.getInstance().connect();

  return lambdaHandler(event, context);
};
