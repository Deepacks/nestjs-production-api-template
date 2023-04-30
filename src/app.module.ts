import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/Auth.module'
import { getEnvVar } from './helpers/getEnvVar.helper'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      `mongodb://${getEnvVar('MONGO_HOST')}:27017/${getEnvVar('MONGO_DB')}`,
      {
        authSource: getEnvVar('MONGO_DB'),
        user: getEnvVar('MONGO_USER'),
        pass: getEnvVar('MONGO_PASS'),
      },
    ),

    // --- auth ---
    AuthModule,
  ],
})
export class AppModule {}
