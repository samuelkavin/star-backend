import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsEnum, IsMongoId, IsNotEmpty, MaxLength, MinLength} from 'class-validator';
import {GenderEnum} from 'src/utils/enums/gender.enum';
import {RaceEnum} from 'src/utils/enums/race.enum';
import {IDirector} from '../interfaces/director.interface';

export class DirectorDto implements IDirector {
  @ApiProperty({
    example: 'Abc Company',
    description: 'Company name',
    format: 'string',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'ABC123',
    description: 'Company registration number',
    format: 'string',
  })
  @IsNotEmpty()
  nric: string;

  @IsNotEmpty()
  @IsEnum(GenderEnum)
  @ApiProperty({enum: GenderEnum})
  gender: GenderEnum;

  @IsNotEmpty()
  @IsEnum(RaceEnum)
  @ApiProperty({enum: RaceEnum})
  race: RaceEnum;

  @ApiProperty({
    example: 'Director',
    description: 'Position in company',
    format: 'string',
  })
  @IsNotEmpty()
  designation: string;

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
    example: '+60124174701',
    description: 'Company phone number',
    format: 'string',
  })
  @IsNotEmpty()
  mobile: string;

  @ApiProperty({
    example: '5fe628f5d9bb6ece26c45431',
    description: 'Company phone number',
    format: 'string',
  })
  @IsNotEmpty()
  @IsMongoId()
  companyId: string;
}
