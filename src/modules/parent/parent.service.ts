import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ParentDto} from './dto/parent.dto';
import {IParent, IParentDocument} from './interfaces/parent.interface';

@Injectable()
export class ParentService {
  constructor(@InjectModel('Parent') private parentModel: Model<IParentDocument>) {}

  async createParent(parent: ParentDto): Promise<IParent> {
    const isMobileExist = await this.parentModel.exists({mobile: parent.mobile});

    if (isMobileExist) {
      throw new BadRequestException(`${parent.mobile} already exist in DB`);
    }

    const profile = new this.parentModel(parent);
    return await this.parentModel.create(profile);
  }

  async getAllParents(): Promise<IParent[]> {
    return await this.parentModel.find();
  }

  async getParentById(parentId: string): Promise<IParent> {
    let result;
    try {
      result = await this.parentModel.find({_id: parentId});
    } catch (error) {
      throw new NotFoundException('Parent is not found!');
    }
    return result;
  }

  async updateParentDetails(parentId: string, body: ParentDto): Promise<any> {
    if (!parentId) {
      throw new NotFoundException('parentId is not found!');
    }

    await this.parentModel.update({_id: parentId}, {$set: body});

    return {
      message: `${body.firstname} ${body.lastname} has successfully updated`,
    };
  }
}
