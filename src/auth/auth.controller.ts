import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { UserAuthDto } from '../modules/userAccount/dto/userAuth.dto';
import { isDev } from '../helpers/isDev.helper';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('authenticate')
  public async authenticate(
    @Res({ passthrough: true }) res: Response,
    @Body() userAuthDto: UserAuthDto,
  ) {
    const token = await this.authService.authenticate(userAuthDto);
    res.cookie('Bearer', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      signed: true,
      httpOnly: true,
      secure: isDev() ? false : true,
    });
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() req: Request) {
    this.authService.revokeToken(req.signedCookies.Bearer);
  }
}
