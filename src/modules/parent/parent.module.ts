import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthModule} from '../auth/auth.module';
import {ParentController} from './parent.controller';
import {ParentService} from './parent.service';
import {ParentSchema} from './schemas/parent.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Parent', schema: ParentSchema}]), AuthModule],
  controllers: [ParentController],
  providers: [ParentService],
})
export class ParentModule {}
