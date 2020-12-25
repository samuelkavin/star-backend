import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthModule} from '../auth/auth.module';
import {CompanyModule} from '../company/company.module';
import {CompanySchema} from '../company/schemas/company.schema';
import {DirectorController} from './director.controller';
import {DirectorService} from './director.service';
import {DirectorSchema} from './schemas/director.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Company', schema: CompanySchema},
      {name: 'Director', schema: DirectorSchema},
    ]),
    AuthModule,
    CompanyModule,
  ],
  controllers: [DirectorController],
  providers: [DirectorService],
})
export class DirectorModule {}
