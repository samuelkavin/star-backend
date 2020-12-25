import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CompanyService} from '../company/company.service';
import {BranchDto} from './dto/branch.dto';
import {BranchDocument} from './interfaces/branch.interface';

@Injectable()
export class BranchService {
  constructor(
    @InjectModel('Branch') private branchModel: Model<BranchDocument>,
    private companyService: CompanyService,
  ) {}

  async createBranch(response: BranchDto): Promise<any> {
    const getCompanyId = await this.companyService.getCompanyById(response.companyId);
    console.log('wwww', getCompanyId);
    const result = new this.branchModel(response);
    return await this.branchModel.create(result);
  }

  async getBranchById(branchId: string): Promise<any[]> {
    return await this.branchModel.find({branchId});
  }

  async getAllBranches(): Promise<any[]> {
    return await this.branchModel.find();
  }

  async updateBranchDetails(branchId: string, branchDetails: BranchDto): Promise<any> {
    if (!branchId) {
      throw new NotFoundException('Branch is not found!');
    }
    await this.branchModel.update({_id: branchId}, {$set: branchDetails});

    return {
      message: `${branchDetails.name} has successfully updated`,
    };
  }
}
