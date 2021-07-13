import {Document} from 'mongoose';
import {IAddress} from 'src/utils/interfaces/address.interface';
import {IBankAccount} from 'src/utils/interfaces/bank.interface';

export interface IStaff {
  name: string;
  nric: string;
  race: string;
  email: string;
  mobile: string;
  gender: string;
  personalEmail: string;
  maritalStatus: string;
  nationality: string;
  emergencyContactName: string;
  emergencyContact: string;
  bankDetails: IBankAccount;
  employmentDetails: IEmployment;
  address: IAddress;
  companyId: string;
}

export interface IEmployment {
  joinedDate: Date;
  branch: string;
  position: string;
  earningFrequency: string;
  epfNumber: string;
  epfContribution: number;
  socsoNumber: string;
  pcbNumber: string;
}

export interface IStaffDocument extends IStaff, Document {}
