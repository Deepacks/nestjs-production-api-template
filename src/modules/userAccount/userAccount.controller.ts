import { Controller, Delete, Get, Req, UseGuards } from '@nestjs/common';

import { UserAccountService } from './userAccount.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AuthRequest } from 'src/auth/types/auth.type';
import { UserSessionDto } from './dto/userSession.dto';

@Controller('user')
export class UserAccountController {
  constructor(private userAccountService: UserAccountService) {}

  @Get('data')
  @UseGuards(JwtAuthGuard)
  getUserData(@Req() req: AuthRequest): Promise<UserSessionDto> {
    return this.userAccountService.getUserDataById(req.user.userId);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteUser(@Req() req: AuthRequest) {
    this.userAccountService.delete(req.user.userId);
  }
}
