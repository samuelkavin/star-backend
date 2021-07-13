import {ApiProperty} from '@nestjs/swagger';
import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsEnum,
  IsOptional,
  IsMongoId,
} from 'class-validator';
import {AddressDto} from 'src/utils/dto/address.dto';
import {StatusEnum} from 'src/utils/enums/status.enum';
import {IAddress} from 'src/utils/interfaces/address.interface';
import {IBranch} from '../interfaces/branch.interface';

export class BranchDto implements IBranch {
  @ApiProperty({
    example: 'Abc Company',
    description: 'Company name',
    format: 'string',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Butterworth',
    description: 'Company location',
    format: 'string',
  })
  @IsNotEmpty()
  location: string;

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
  fax?: string;

  @IsNotEmpty()
  @IsEnum(StatusEnum)
  @ApiProperty({enum: StatusEnum})
  status: StatusEnum;

  @ApiProperty({
    type: AddressDto,
  })
  @IsNotEmpty()
  address: IAddress;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  isRegisteredAsCompany?: boolean;

  @ApiProperty({
    example: 'Abc Company',
    description: 'Company name',
    format: 'string',
  })
  @IsNotEmpty()
  companyName?: string;

  @ApiProperty({
    example: 'ABC123',
    description: 'Company registration number',
    format: 'string',
  })
  @IsNotEmpty()
  businessRegNumber?: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI',
    description: 'Company id',
    format: 'string',
  })
  @IsNotEmpty()
  @IsMongoId()
  companyId: string;
}
