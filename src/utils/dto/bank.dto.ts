import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';
import {IBankAccount} from '../interfaces/bank.interface';

export class BankAccountDto implements IBankAccount {
  @ApiProperty({
    example: 'CIMB Berhad',
    description: 'Bank name',
    format: 'string',
  })
  @IsNotEmpty()
  bankName: string;

  @ApiProperty({
    example: '123456',
    description: 'Bank account number',
    format: 'string',
  })
  @IsNotEmpty()
  accountNumber: string;

  @ApiProperty({
    example: 'Online Transfer',
    description: 'Preffered payment method for salary',
    format: 'string',
  })
  @IsNotEmpty()
  preferredPaymentMethod: string;
}
