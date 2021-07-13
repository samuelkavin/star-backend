import {Document} from 'mongoose';
import {IAddress} from 'src/utils/interfaces';

export interface IStudent {
  firstname: string;
  lastname: string;
  myKid: string;
  dob: Date;
  gender: string;
  race: string;
  religion: string;
  mobile: string;
  email: string;
  companyId: string;
  address: IAddress;
}

export interface IStudentDocument extends IStudent, Document {}
