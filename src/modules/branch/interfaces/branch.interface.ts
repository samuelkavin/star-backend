import {Document} from 'mongoose';
import {IAddress} from 'src/utils/interfaces/address.interface';

export interface IBranch {
  companyId: string;
  name: string;
  location: string;

  email: string;
  phone: string;
  fax?: string;

  status: string;
  address: IAddress;

  isRegisteredAsCompany?: boolean;
  companyName?: string;
  businessRegNumber?: string;
}

export interface BranchDocument extends IBranch, Document {}
