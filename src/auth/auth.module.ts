import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { getEnvVar } from 'src/helpers/getEnvVar.helper'
import { UserModule } from 'src/core/user/user.module'
import { JwtStrategy } from './jwt.strategy'
import { RevokedTokenModule } from 'src/core/revokedToken/revokedToken.module'

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: getEnvVar('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),

    UserModule,
    RevokedTokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
