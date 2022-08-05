import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from './auth.service';
import { getEnvVar } from '../helpers/getEnvVar.helper';
import { UserAccount } from '../schemas/userAccount.schema';
import { TokenDto } from 'src/modules/revokedToken/dto/token.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJwt]),
      secretOrKey: getEnvVar('JWT_SECRET'),
    });
  }

  public async validate(tokenDto: TokenDto): Promise<UserAccount> {
    const user = await this.authService.validateUser(tokenDto);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  public static extractJwt(req: Request): string | null {
    if (req.signedCookies && 'Bearer' in req.signedCookies) {
      return req.signedCookies.Bearer;
    }
    return null;
  }
}
