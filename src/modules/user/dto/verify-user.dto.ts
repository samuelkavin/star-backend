import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from 'class-validator';
import {VerifyEmail} from '../interfaces/user.interface';

export class VerifyUserDto implements VerifyEmail {
  @ApiProperty({
    description: '6 digits code to verify user',
    format: 'string',
    uniqueItems: true,
    required: true,
  })
  @IsNotEmpty()
  readonly verification: string;

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
    example: '+60121234567',
    description: `User's phone number`,
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly mobileNumber: string;
}
