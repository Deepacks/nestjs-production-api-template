import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from './auth.service';
import { getEnvVar } from '../helpers/getEnvVar.helper';
import { TokenDto } from 'src/modules/revokedToken/dto/token.dto';
import { RequestUser } from './types/auth.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJwt]),
      secretOrKey: getEnvVar('JWT_SECRET'),
    });
  }

  public async validate(tokenDto: TokenDto): Promise<RequestUser> {
    return this.authService.validateUser(tokenDto);
  }

  public static extractJwt(req: Request): string | null {
    if (req.signedCookies && 'Bearer' in req.signedCookies) {
      return req.signedCookies.Bearer;
    }
    return null;
  }
}
