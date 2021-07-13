import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsEnum, MinLength, MaxLength, IsEmail, IsMongoId} from 'class-validator';
import {GenderEnum, RaceEnum, ReligionEnum} from 'src/utils/enums';
import {IParent} from '../interfaces/parent.interface';

export class ParentDto implements IParent {
  @ApiProperty({
    example: 'John',
    description: 'Parent first name',
    format: 'string',
  })
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Parent last name',
    format: 'string',
  })
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    example: 'Single',
    description: 'Parent relationship with student',
    format: 'string',
  })
  @IsNotEmpty()
  relationship: string;

  @ApiProperty({
    example: '900510355279',
    description: 'NRIC number',
    format: 'string',
  })
  @IsNotEmpty()
  nric: string;

  @IsNotEmpty()
  @IsEnum(RaceEnum)
  @ApiProperty({enum: RaceEnum})
  race: RaceEnum;

  @IsNotEmpty()
  @IsEnum(ReligionEnum)
  @ApiProperty({enum: ReligionEnum})
  religion: ReligionEnum;

  @IsNotEmpty()
  @IsEnum(GenderEnum)
  @ApiProperty({enum: GenderEnum})
  gender: GenderEnum;

  @ApiProperty({
    example: '+6035002000',
    description: 'Home phone number',
    format: 'string',
  })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: '+60124175000',
    description: 'Mobile number',
    format: 'string',
  })
  @IsNotEmpty()
  mobile: string;

  @ApiProperty({
    example: 'parent@gmail.com',
    description: 'Parent login email',
    format: 'email',
    uniqueItems: true,
    minLength: 5,
    maxLength: 255,
  })
  @MinLength(5)
  @MaxLength(255)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '5fe628f5d9bb6ece26c45431',
    description: 'Student mongo ID',
    format: 'string',
  })
  @IsNotEmpty()
  @IsMongoId()
  studentId: string;
}
