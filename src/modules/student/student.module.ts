import {Module} from '@nestjs/common';
import {StudentService} from './student.service';
import {StudentController} from './student.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthModule} from '../auth/auth.module';
import {StudentSchema} from './schemas/student.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Student', schema: StudentSchema}]), AuthModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
