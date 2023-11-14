import { LogFormatter as AWSLogFormatter, Logger } from '@aws-lambda-powertools/logger';
import { LogAttributes, UnformattedAttributes } from '@aws-lambda-powertools/logger/lib/types';

type ILog = LogAttributes;

export class LogFormatter extends AWSLogFormatter {
  public formatAttributes(attributes: UnformattedAttributes): ILog {
    return {
      message: attributes.message,
      logLevel: attributes.logLevel,
      info: {
        environment: attributes.environment,
        awsRegion: attributes.awsRegion
      }
    };
  }
}

export const logger = new Logger();
