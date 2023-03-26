import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

import { getEnvVar } from './helpers/getEnvVar.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({
    credentials: true,
    origin: `http://localhost:${getEnvVar('PORT')}`,
  });
  app.use(cookieParser(getEnvVar('COOKIE_SIGNATURE')));

  await app.listen(getEnvVar('PORT'), '0.0.0.0');
}
bootstrap();
