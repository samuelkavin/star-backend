import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {StudentDto} from './dto/student.dto';
import {IStudent, IStudentDocument} from './interfaces/student.interface';

@Injectable()
export class StudentService {
  constructor(@InjectModel('Student') private studentModel: Model<IStudentDocument>) {}

  async createStudentProfile(createStudent: StudentDto): Promise<IStudent> {
    const profile = new this.studentModel(createStudent);
    return await this.studentModel.create(profile);
  }

  async getAllStudents(): Promise<IStudent[]> {
    return await this.studentModel.find();
  }

  async getStudentById(studentId: string): Promise<IStudent> {
    let result;
    try {
      result = await this.studentModel.findById({_id: studentId});
    } catch (error) {
      throw new NotFoundException('Student is not found!');
    }

    console.log('result', result);
    return result;
  }

  async getStudentByCompanyId(companyId: string): Promise<IStudent[]> {
    let result;
    try {
      result = await this.studentModel.find({companyId});
    } catch (error) {
      throw new NotFoundException('Students list are not found!');
    }

    return result;
  }

  async updateStudentDetails(profileId: string, body: StudentDto): Promise<any> {
    if (!profileId) {
      throw new NotFoundException('ProfileId is not found!');
    }

    await this.studentModel.update({_id: profileId}, {$set: body});

    return {
      message: `${body.firstname} ${body.lastname} has successfully updated`,
    };
  }
}
