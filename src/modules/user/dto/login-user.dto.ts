import {ApiProperty} from '@nestjs/swagger';
import {MinLength, MaxLength, IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'User login email',
    format: 'email',
    uniqueItems: true,
    minLength: 5,
    maxLength: 255,
  })
  @MinLength(5)
  @MaxLength(255)
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'Password87$',
    description: 'User login password',
    format: 'string',
    minLength: 5,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(1024)
  readonly password: string;
}
