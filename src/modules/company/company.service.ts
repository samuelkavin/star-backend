import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CompanyDto} from './dto/company.dto';
import {ICompanyDocument} from './interfaces/company.interface';

@Injectable()
export class CompanyService {
  constructor(@InjectModel('Company') private companyModel: Model<ICompanyDocument>) {}

  async createCompanyProfile(createCompany: CompanyDto): Promise<any> {
    const profile = new this.companyModel(createCompany);
    const result = await this.companyModel.create(profile);
    const {_id, status} = result;

    return {
      _id,
      status,
    };
  }
}
