import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { GuardedRequest } from 'src/auth/types/auth.types'
import { UserSessionDto } from './dto/userSession-dto.type'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: GuardedRequest): Promise<UserSessionDto> {
    return this.userService.getUserData(req.user.userId)
  }
}
