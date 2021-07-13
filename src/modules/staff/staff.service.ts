import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {StaffDto} from './dto/staff.dto';
import {IStaff, IStaffDocument} from './interfaces/staff.interface';

@Injectable()
export class StaffService {
  constructor(@InjectModel('Staff') private staffModel: Model<IStaffDocument>) {}

  async createStaffProfile(createStaff: StaffDto): Promise<IStaff> {
    const profile = new this.staffModel(createStaff);
    return await this.staffModel.create(profile);
  }

  async getAllStaff(): Promise<IStaff[]> {
    return await this.staffModel.find();
  }

  async getStaffById(staffId: string): Promise<IStaff> {
    let result;
    try {
      result = await this.staffModel.find({_id: staffId});
    } catch (error) {
      throw new NotFoundException('Staff is not found!');
    }
    return result;
  }

  async getStaffByCompanyId(companyId: string): Promise<IStaff[]> {
    let result;
    console.log('staffId0000', companyId);
    try {
      result = await this.staffModel.find({companyId});
    } catch (error) {
      throw new NotFoundException('Staff list are not found!');
    }

    return result;
  }

  async updateStaffDetail(staffId: string, data: StaffDto): Promise<any> {
    if (!staffId) {
      throw new NotFoundException('staffId is not found!');
    }

    return await this.staffModel.update({_id: staffId}, {$set: data});
  }
}
