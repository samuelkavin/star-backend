import {Document} from 'mongoose';
import {StatusEnum} from 'src/utils/enums/status.enum';
import {IAddress} from 'src/utils/interfaces/address.interface';

export interface ICompany {
  companyName: string;
  businessRegNumber: string;
  email: string;
  phone: string;
  fax?: string;
  status: StatusEnum;
  preferredLanguage: string;
  address: IAddress;
}

export interface ICompanyDocument extends ICompany, Document {}

export enum LanguageEnum {
  EN = 'ENGLISH',
  MS = 'BAHASA MALAYSIA',
  TA = 'TAMIL',
  ZH = 'CHINESE',
}
