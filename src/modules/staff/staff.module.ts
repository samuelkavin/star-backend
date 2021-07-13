import {Module} from '@nestjs/common';
import {StaffService} from './staff.service';
import {StaffController} from './staff.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthModule} from '../auth/auth.module';
import {StaffSchema} from './schemas/staff.schemas';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Staff', schema: StaffSchema}]), AuthModule],
  providers: [StaffService],
  controllers: [StaffController],
})
export class StaffModule {}
