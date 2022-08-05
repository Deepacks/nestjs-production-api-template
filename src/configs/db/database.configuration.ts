import { DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { getEnvVar } from '../../helpers/getEnvVar.helper';

export const configureMongooseModule: () => DynamicModule = () => {
  return MongooseModule.forRootAsync({
    useFactory: () => ({
      uri: `mongodb://${getEnvVar('MONGO_HOST')}:${getEnvVar(
        'MONGO_PORT',
      )}/${getEnvVar('MONGO_DB_NAME')}`,
      authSource: getEnvVar('MONGO_AUTH_SOURCE'),
      user: getEnvVar('MONGO_USER'),
      pass: getEnvVar('MONGO_PASS'),
    }),
  });
};
