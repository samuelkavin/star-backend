import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from 'class-validator';
import {User} from '../interfaces/user.interface';

export class CreateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
    format: 'string',
    minLength: 2,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  readonly firstname: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
    format: 'string',
    minLength: 2,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  readonly lastname: string;

  @ApiProperty({
    example: '+60121234567',
    description: `User's phone number`,
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  readonly mobileNumber: string;

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
    maxLength: 1024,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(1024)
  readonly password: string;

  // @ApiProperty({
  //   example: '123456',
  //   description: 'Company ID',
  //   format: 'string',
  // })
  // @IsNotEmpty()
  // @IsString()
  // readonly companyId: string;
}
