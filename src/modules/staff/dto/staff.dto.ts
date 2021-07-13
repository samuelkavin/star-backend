import {ApiProperty} from '@nestjs/swagger';
import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsEnum,
  IsDate,
  IsMongoId,
} from 'class-validator';
import {AddressDto} from 'src/utils/dto/address.dto';
import {BankAccountDto} from 'src/utils/dto/bank.dto';
import {GenderEnum} from 'src/utils/enums/gender.enum';
import {MartialEnum} from 'src/utils/enums/marital.enum';
import {RaceEnum} from 'src/utils/enums/race.enum';
import {IAddress} from 'src/utils/interfaces/address.interface';
import {IBankAccount} from 'src/utils/interfaces/bank.interface';
import {IEmployment, IStaff} from '../interfaces/staff.interface';

export class EmploymentDto implements IEmployment {
  @ApiProperty({
    example: '2020-12-27T07:44:58.301Z',
    description: 'Staff joined date',
    format: 'date',
  })
  @IsNotEmpty()
  @IsDate()
  joinedDate: Date;

  @ApiProperty({
    example: 'Bangsar',
    description: 'Branch name',
    format: 'string',
  })
  @IsNotEmpty()
  branch: string;

  @ApiProperty({
    example: 'Principle',
    description: 'Role name in organization',
    format: 'string',
  })
  @IsNotEmpty()
  position: string;

  @ApiProperty({
    example: 'Monthly',
    description: 'Payment frequency',
    format: 'string',
  })
  @IsNotEmpty()
  earningFrequency: string;

  @ApiProperty({
    example: '123456',
    description: 'EPF number',
    format: 'string',
  })
  @IsNotEmpty()
  epfNumber: string;

  @ApiProperty({
    example: 9,
    description: 'EPF contribution in percentage',
    format: 'string',
  })
  @IsNotEmpty()
  epfContribution: number;

  @ApiProperty({
    example: '870501355299',
    description: 'EPF contribution in percentage',
    format: 'string',
  })
  @IsNotEmpty()
  socsoNumber: string;

  @ApiProperty({
    example: '123456789',
    description: 'Income tax number',
    format: 'string',
  })
  @IsNotEmpty()
  pcbNumber: string;
}

export class StaffDto implements IStaff {
  @ApiProperty({
    example: 'John Doe',
    description: 'Staff name',
    format: 'string',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '870510355279',
    description: 'NRIC number',
    format: 'string',
  })
  @IsNotEmpty()
  nric: string;

  @IsNotEmpty()
  @IsEnum(RaceEnum)
  @ApiProperty({enum: RaceEnum})
  race: RaceEnum;

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
  mobile: string;

  @IsNotEmpty()
  @IsEnum(GenderEnum)
  @ApiProperty({enum: GenderEnum})
  gender: GenderEnum;

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
  personalEmail: string;

  @IsNotEmpty()
  @IsEnum(MartialEnum)
  @ApiProperty({enum: MartialEnum})
  maritalStatus: MartialEnum;

  @ApiProperty({
    example: 'MALAYSIAN',
    description: 'Staff origin country',
    format: 'string',
  })
  @IsNotEmpty()
  nationality: string;

  @ApiProperty({
    example: 'Lisa',
    description: 'Staff emergency contact person name',
    format: 'string',
  })
  @IsNotEmpty()
  emergencyContactName: string;

  @ApiProperty({
    example: '+60124174701',
    description: 'Staff emergency contact person',
    format: 'string',
  })
  @IsNotEmpty()
  emergencyContact: string;

  @ApiProperty({
    type: BankAccountDto,
  })
  @IsNotEmpty()
  bankDetails: IBankAccount;

  @ApiProperty({
    type: EmploymentDto,
  })
  @IsNotEmpty()
  employmentDetails: IEmployment;

  @ApiProperty({
    type: AddressDto,
  })
  @IsNotEmpty()
  address: IAddress;

  @ApiProperty({
    example: '5fe628f5d9bb6ece26c45431',
    description: 'Company id',
    format: 'string',
  })
  @IsNotEmpty()
  @IsMongoId()
  companyId: string;
}
