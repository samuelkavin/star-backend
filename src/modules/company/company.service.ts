import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {BranchDocument, IBranch} from '../branch/interfaces/branch.interface';
import {CompanyDto} from './dto/company.dto';
import {ICompany, ICompanyDocument} from './interfaces/company.interface';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('Company') private companyModel: Model<ICompanyDocument>,
    @InjectModel('Branch') private branchModel: Model<BranchDocument>,
  ) {}

  async createCompanyProfile(createCompany: CompanyDto): Promise<any> {
    const profile = new this.companyModel(createCompany);
    await this.findByEmailPhone(createCompany);
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

  async getCompanyById(companyId: string): Promise<ICompany> {
    let result;
    try {
      result = await this.companyModel.findById(companyId);
      // const companies = await this.branchModel.find({companyId});
    } catch (error) {
      throw new NotFoundException('Company is not found!');
    }
    return result;
  }

  async getCompanyBranches(companyId: string): Promise<IBranch[]> {
    let result;
    try {
      result = await this.branchModel.find({companyId});
    } catch (error) {
      throw new NotFoundException('Company list are not found!');
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

  private async findByEmailPhone(profile: CompanyDto) {
    const {email, phone} = profile;
    const contactInfo = await this.companyModel.findOne({email, phone});
    if (contactInfo) {
      throw new ConflictException('Email or phone number are already in used!');
    }
    return contactInfo;
  }
}
