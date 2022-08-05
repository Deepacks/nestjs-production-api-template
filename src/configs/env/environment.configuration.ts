import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { isDev } from '../../helpers/isDev.helper';

export const configureEnvModule: () => DynamicModule = () =>
  ConfigModule.forRoot({
    isGlobal: true,
    ignoreEnvFile: !isDev(),
  });
