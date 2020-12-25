import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CompanyDto} from './dto/company.dto';
import {ICompany, ICompanyDocument} from './interfaces/company.interface';

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

  async getAllCompanies(): Promise<ICompany[]> {
    return await this.companyModel.find();
  }

  async getCompanyById(profileId: string): Promise<ICompany> {
    let result;
    try {
      result = await this.companyModel.findById(profileId);
    } catch (error) {
      throw new NotFoundException('Company is not found!');
    }

    return result;
  }

  async updateCompanyDetail(profileId: string, company: CompanyDto): Promise<any> {
    if (!profileId) {
      throw new NotFoundException('ProfileId is not found!');
    }

    await this.companyModel.update({_id: profileId}, {$set: company});

    return {
      message: `${company.companyName} has successfully updated`,
    };
  }
}
