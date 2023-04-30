import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { isDev } from 'src/helpers/isDev.helper'
import type { CookieOptions, Response } from 'express'
import type { AuthDto } from './dto/auth-dto.type'
import { JwtAuthGuard } from './jwt-auth.guard'
import { GuardedRequest } from './types/auth.types'

const COOKIE_OPTIONS: CookieOptions = {
  maxAge: 1000 * 60 * 60 * 24 * 7,
  httpOnly: true,
  signed: true,
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() authDto: AuthDto,
  ) {
    const jwt = await this.authService.register(authDto)
    res.cookie('Bearer', jwt, {
      ...COOKIE_OPTIONS,
      secure: !isDev(),
    })
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() authDto: AuthDto,
  ) {
    const jwt = await this.authService.loginUser(authDto)
    res.cookie('Bearer', jwt, {
      ...COOKIE_OPTIONS,
      secure: !isDev(),
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(
    @Req() req: GuardedRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.cookie('Bearer', '', { maxAge: 0 })
    this.authService.revokeToken(req.signedCookies.Bearer)
  }
}
