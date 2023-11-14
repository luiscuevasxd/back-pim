import cors from '@fastify/cors';
import fastify from 'fastify';
import { registerAppRoutes } from './infrastructure/presentations';
import { errorFormatter, schemaErrorFormatter, validatorCompiler } from './infrastructure/utils';

const app = fastify();
app.register(registerAppRoutes);
app.setValidatorCompiler(validatorCompiler);
app.setErrorHandler(errorFormatter);
app.setSchemaErrorFormatter(schemaErrorFormatter);
app.register(cors);
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

if (process.env.ENVIRONMENT === 'localhost') {
  const port = Number(process.env.SERVICES_PORT ?? 3000);
  app.listen({ port }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log(`app listening at ${address}`);
  });

  app.ready(() => {
    console.info(app.printRoutes());
  });
}

export default app;
