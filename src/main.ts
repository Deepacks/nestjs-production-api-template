import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { getEnvVar } from './helpers/getEnvVar.helper'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('/api')
  app.enableCors({
    credentials: true,
    origin: getEnvVar('JAVASCRIPT_ORIGIN_URL'),
  })
  app.use(cookieParser(getEnvVar('COOKIE_SECRET')))

  await app.listen(3001)
}
bootstrap()
