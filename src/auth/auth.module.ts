import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { getEnvVar } from '../helpers/getEnvVar.helper';
import { UserAccountModule } from '../modules/userAccount/userAccount.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { RevokedTokenModule } from '../modules/revokedToken/revokedToken.module';

@Module({
  imports: [
    UserAccountModule,
    RevokedTokenModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: getEnvVar('JWT_SECRET'),
          signOptions: { expiresIn: '7d' },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
