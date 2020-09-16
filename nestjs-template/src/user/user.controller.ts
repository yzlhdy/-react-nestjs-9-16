import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../shared/auth.guard';
import { UserDTO, UserRO } from './user.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@Controller()
@ApiTags('用户接口')
@ApiBearerAuth() // Swagger 的 JWT 验证
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('user')
    @UseGuards(new AuthGuard())
    show() {
        return this.userService.showAll()
    }

    @Post('login')
    login(@Body() data: UserDTO) {
        return this.userService.login(data)
    }

    @Post('register')
    register(@Body() data: UserRO) {
        return this.userService.register(data)
    }

}
