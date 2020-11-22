import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsEnum, IsNotEmpty, IsOptional, MaxLength, MinLength} from 'class-validator';
import {IAddress, ICompany, LanguageEnum, StatusEnum} from '../interfaces/company.interface';

// Addressdto starts here
export class AddressDto implements IAddress {
  @ApiProperty({
    example: 'No 16, Jalan Tengku',
    description: 'Address line 1',
    format: 'string',
  })
  @IsNotEmpty()
  line1: string;

  @ApiProperty({
    example: 'Taman Sri Rampai',
    description: 'Address line 2',
    format: 'string',
  })
  @IsOptional()
  line2: string;

  @ApiProperty({
    example: '13200',
    description: 'City name',
    format: 'string',
  })
  @IsNotEmpty()
  passcode: string;

  @ApiProperty({
    example: 'Kepala Batas',
    description: 'City name',
    format: 'string',
  })
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    example: 'Kuala Lumpur',
    description: 'State name',
    format: 'string',
  })
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    example: 'Malaysia',
    description: 'Country name',
    format: 'string',
  })
  @IsNotEmpty()
  country: string;
}

// CompanyDto starts here
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
