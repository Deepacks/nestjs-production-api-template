import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { getEnvVar } from './helpers/getEnvVar.helper';
import { AuthModule } from './auth/auth.module';
import { UserAccountModule } from './modules/userAccount/userAccount.module';
import { RevokedTokenModule } from './modules/revokedToken/revokedToken.module';
import { HttpLoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: `mongodb://${getEnvVar('MONGO_HOST')}:${getEnvVar(
          'MONGO_PORT',
        )}/${getEnvVar('MONGO_DB_NAME')}`,
        authSource: getEnvVar('MONGO_AUTH_SOURCE'),
        user: getEnvVar('MONGO_USER'),
        pass: getEnvVar('MONGO_PASS'),
      }),
    }),

    AuthModule,
    UserAccountModule,
    RevokedTokenModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
