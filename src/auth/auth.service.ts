import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { genSalt, hash as genHash } from 'bcryptjs';

import { UserAccountService } from '../modules/userAccount/userAccount.service';
import { RevokedTokenService } from '../modules/revokedToken/revokedToken.service';
import { UserAuthDto } from '../modules/userAccount/dto/userAuth.dto';
import { TokenDto } from '../modules/revokedToken/dto/token.dto';
import { compare } from 'bcryptjs';
import { RequestUser } from './types/auth.type';

@Injectable()
export class AuthService {
  constructor(
    private userAccountService: UserAccountService,
    private revokedTokenService: RevokedTokenService,
    private jwtService: JwtService,
  ) {}

  async loginUser(userAuthDto: UserAuthDto): Promise<string> {
    const { email, password } = userAuthDto;

    const user = await this.userAccountService.findByEmail(email);
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const validCredentials = compare(password, user.hash);
    if (!validCredentials) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return this.createJwt(user._id.toString());
  }

  async registerUser(userAuthDto: UserAuthDto): Promise<string> {
    const { email, password } = userAuthDto;

    const existingUser = await this.userAccountService.findByEmail(email);
    if (existingUser) {
      throw new HttpException('Already exists', HttpStatus.FORBIDDEN);
    }

    const salt = await genSalt(10);
    const hash = await genHash(password, salt);
    const user = await this.userAccountService.create(email, hash);

    return this.createJwt(user._id.toString());
  }

  async validateUser(tokenDto: TokenDto): Promise<RequestUser> {
    const { userId } = tokenDto;

    const user = await this.userAccountService.findById(userId);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const revokedToken = await this.revokedTokenService.find(tokenDto);
    if (revokedToken) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return { userId: user._id.toString() };
  }

  createJwt(userId: string): string {
    return this.jwtService.sign({ userId });
  }

  async revokeToken(token: string) {
    const jwt = this.jwtService.decode(token) as TokenDto;
    await this.revokedTokenService.revoke(jwt);
  }
}
