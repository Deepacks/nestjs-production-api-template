import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserAccountService } from '../modules/userAccount/userAccount.service';
import { RevokedTokenService } from '../modules/revokedToken/revokedToken.service';
import { UserAuthDto } from '../modules/userAccount/dto/userAuth.dto';
import { UserAccount } from '../schemas/userAccount.schema';
import { TokenDto } from '../modules/revokedToken/dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private userAccountService: UserAccountService,
    private revokedTokenService: RevokedTokenService,
    private jwtService: JwtService,
  ) {}

  async authenticate(userAuthDto: UserAuthDto): Promise<string> {
    const { email } = userAuthDto;
    const user = await this.userAccountService.findByEmail(email);

    if (!user) {
      const { _id } = await this.userAccountService.create(userAuthDto);
      return this.jwtService.sign({ userId: _id });
    }

    return this.jwtService.sign({ userId: user._id });
  }

  async validateUser(tokenDto: TokenDto): Promise<UserAccount> {
    const { userId } = tokenDto;

    const user = await this.userAccountService.findById(userId);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const revokedToken = await this.revokedTokenService.find(tokenDto);
    if (revokedToken) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async revokeToken(token: string) {
    const jwt = this.jwtService.decode(token);
    await this.revokedTokenService.revoke(jwt as TokenDto);
  }
}
