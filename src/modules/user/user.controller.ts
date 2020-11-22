import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';

import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {LoginUserDto} from './dto/login-user.dto';
import {VerifyUserDto} from './dto/verify-user.dto';
import {AuthGuard} from '@nestjs/passport';
import {GetUser} from '../auth/decorators/get-user.decorator';
import {User} from './interfaces/user.interface';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden'})
  @ApiOperation({
    operationId: 'signupUser',
    summary: 'Signup new user',
  })
  @UsePipes(ValidationPipe)
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.userService.signup(createUserDto);
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    operationId: 'verifyEmail',
    summary: 'Verify user email',
  })
  async verifyUserEmail(@Body() verifyUserDto: VerifyUserDto) {
    return await this.userService.verifyUserEmail(verifyUserDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    operationId: 'signinUser',
    summary: 'Signin user',
  })
  async login(@Req() req, @Body() loginUserDto: LoginUserDto) {
    return await this.userService.signin(loginUserDto);
  }

  @Post('test')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    operationId: 'test',
    summary: 'test user',
  })
  @UseGuards(AuthGuard())
  async test(@GetUser() user: User) {
    console.log('reqreq', user);
  }
}
