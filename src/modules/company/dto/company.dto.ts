import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsEnum, IsNotEmpty, MaxLength, MinLength} from 'class-validator';
import {AddressDto} from 'src/utils/dto/address.dto';
import {StatusEnum} from 'src/utils/enums/status.enum';
import {IAddress} from 'src/utils/interfaces/address.interface';
import {ICompany, LanguageEnum} from '../interfaces/company.interface';

export class CompanyDto implements ICompany {
  @ApiProperty({
    example: 'Abc Company',
    description: 'Company name',
    format: 'string',
  })
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({
    example: 'ABC123',
    description: 'Company registration number',
    format: 'string',
  })
  @IsNotEmpty()
  businessRegNumber: string;

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
  phone: string;

  @ApiProperty({
    example: '+60124174701',
    description: 'Company fax number',
    format: 'string',
  })
  @IsNotEmpty()
  fax: string;

  @IsNotEmpty()
  @IsEnum(LanguageEnum)
  @ApiProperty({enum: LanguageEnum})
  @IsNotEmpty()
  readonly preferredLanguage: LanguageEnum;

  @IsNotEmpty()
  @IsEnum(StatusEnum)
  @ApiProperty({enum: StatusEnum})
  readonly status: StatusEnum;

  @ApiProperty({
    type: AddressDto,
  })
  @IsNotEmpty()
  address: IAddress;
}
