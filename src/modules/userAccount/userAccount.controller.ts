import { Controller, Delete, Get, Req, UseGuards } from '@nestjs/common';

import { UserAccountService } from './userAccount.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { UserSessionDto } from './dto/userSession.dto';

@Controller('user')
export class UserAccountController {
  constructor(private userAccountService: UserAccountService) {}

  @Get('session')
  @UseGuards(JwtAuthGuard)
  getUserSession(@Req() req: any): Promise<UserSessionDto> {
    return this.userAccountService.getUserSessionById(req.user._id as string);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteUser(@Req() req: any) {
    this.userAccountService.delete(req.user._id as string);
  }
}
