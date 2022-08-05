import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { configureMongooseModule } from './configs/db/database.configuration';
import { configureEnvModule } from './configs/env/environment.configuration';
import { AuthModule } from './auth/auth.module';
import { UserAccountModule } from './modules/userAccount/userAccount.module';
import { HttpLoggerMiddleware } from './middlewares/logger.middleware';
import { RevokedTokenModule } from './modules/revokedToken/revokedToken.module';

@Module({
  imports: [
    configureEnvModule(),
    configureMongooseModule(),
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
