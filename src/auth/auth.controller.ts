import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CookieOptions, Request, Response } from 'express';

import { AuthService } from './auth.service';
import { UserAuthDto } from '../modules/userAccount/dto/userAuth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { isDev } from 'src/helpers/isDev.helper';

const COOKIE_OPTIONS: CookieOptions = {
  maxAge: 1000 * 60 * 60 * 24 * 7,
  httpOnly: true,
  signed: true,
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  public async login(
    @Res({ passthrough: true }) res: Response,
    @Body() userAuthDto: UserAuthDto,
  ) {
    const jwt = await this.authService.loginUser(userAuthDto);
    res.cookie('Bearer', jwt, { ...COOKIE_OPTIONS, secure: !isDev() });
  }

  @Post('register')
  public async register(
    @Res({ passthrough: true }) res: Response,
    @Body() userAuthDto: UserAuthDto,
  ) {
    const jwt = await this.authService.registerUser(userAuthDto);
    res.cookie('Bearer', jwt, { ...COOKIE_OPTIONS, secure: !isDev() });
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.cookie('Bearer', '', { maxAge: 0 });
    this.authService.revokeToken(req.signedCookies.Bearer);
  }
}
