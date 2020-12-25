import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional} from 'class-validator';
import {IAddress} from '../interfaces/address.interface';

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
