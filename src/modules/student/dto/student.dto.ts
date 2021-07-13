import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {
  IsNotEmpty,
  IsEnum,
  MinLength,
  MaxLength,
  IsEmail,
  IsDate,
  IsMongoId,
} from 'class-validator';
import {AddressDto} from 'src/utils/dto/address.dto';
import {GenderEnum} from 'src/utils/enums/gender.enum';
import {RaceEnum} from 'src/utils/enums/race.enum';
import {ReligionEnum} from 'src/utils/enums/religion.enum';
import {IAddress} from 'src/utils/interfaces';
import {IStudent} from '../interfaces/student.interface';

export class StudentDto implements IStudent {
  @ApiProperty({
    example: 'John',
    description: 'Student first name',
    format: 'string',
  })
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({
    example: 'Die',
    description: 'Student last name',
    format: 'string',
  })
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    example: '900510355279',
    description: 'Mykid number',
    format: 'string',
  })
  @IsNotEmpty()
  myKid: string;

  @ApiProperty({
    example: '2020-12-27T07:44:58.301Z',
    description: 'Staff joined date',
    format: 'date',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  dob: Date;

  @IsNotEmpty()
  @IsEnum(GenderEnum)
  @ApiProperty({enum: GenderEnum})
  gender: GenderEnum;

  @IsNotEmpty()
  @IsEnum(RaceEnum)
  @ApiProperty({enum: RaceEnum})
  race: RaceEnum;

  @IsNotEmpty()
  @IsEnum(ReligionEnum)
  @ApiProperty({enum: ReligionEnum})
  religion: ReligionEnum;

  @ApiProperty({
    example: '+60124174701',
    description: 'Company phone number',
    format: 'string',
  })
  @IsNotEmpty()
  mobile: string;

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
  email: string;

  @ApiProperty({
    type: AddressDto,
  })
  @IsNotEmpty()
  address: IAddress;

  @ApiProperty({
    example: '5fe628f5d9bb6ece26c45431',
    description: 'Company phone number',
    format: 'string',
  })
  @IsNotEmpty()
  @IsMongoId()
  companyId: string;
}
