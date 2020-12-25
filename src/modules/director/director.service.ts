import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CompanyService} from '../company/company.service';
import {DirectorDto} from './dto/director.dto';
import {IDirector, IDirectorDocument} from './interfaces/director.interface';

@Injectable()
export class DirectorService {
  constructor(
    @InjectModel('Director') private directorModel: Model<IDirectorDocument>,
    private companyService: CompanyService,
  ) {}

  async createDirector(createDirector: DirectorDto): Promise<any> {
    const getCompanyId = await this.companyService.getCompanyById(createDirector.companyId);
    console.log('getCompanyIdgetCompanyId', getCompanyId);
    const director = new this.directorModel(createDirector);
    const result = await this.directorModel.create(director);

    return result;
  }

  async getAllDirectors(): Promise<IDirector[]> {
    return await this.directorModel.find();
  }

  async getDirectorsByCompanyId(companyId: string): Promise<IDirector[]> {
    let result;
    try {
      result = await this.directorModel.find({companyId});
    } catch (error) {
      throw new NotFoundException('Directors list are not found!');
    }

    return result;
  }
}
