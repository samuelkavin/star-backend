import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {CompanyService} from './company.service';
import {CompanyController} from './company.controller';
import {CompanySchema} from './schemas/company.schema';
import {AuthModule} from '../auth/auth.module';
import {UserSchema} from '../user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Company', schema: CompanySchema},
      {name: 'User', schema: UserSchema},
    ]),
    AuthModule,
  ],
  providers: [CompanyService],
  controllers: [CompanyController],
  exports: [CompanyService],
})
export class CompanyModule {}
