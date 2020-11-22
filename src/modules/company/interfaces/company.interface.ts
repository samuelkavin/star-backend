import {Document} from 'mongoose';

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

export interface IDirector {
  name: string;
  nric: string;
  gender: string;
  race: string;
  designation: string;
  contactNumber?: string;
  email?: string;
}

export interface IAddress {
  line1: string;
  line2?: string;
  city: string;
  passcode: string;
  state: string;
  country: string;
}

export enum StatusEnum {
  Created = 'CREATED',
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Suspended = 'SUSPENDED',
}

export enum LanguageEnum {
  EN = 'ENGLISH',
  MS = 'BAHASA MALAYSIA',
  TA = 'TAMIL',
  ZH = 'CHINESE',
}
