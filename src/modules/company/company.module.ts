import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {CompanyService} from './company.service';
import {CompanyController} from './company.controller';
import {CompanySchema} from './schemas/company.schema';
import {AuthModule} from '../auth/auth.module';
import {UserSchema} from '../user/schemas/user.schema';
import {BranchSchema} from '../branch/schemas/branch.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Company', schema: CompanySchema},
      {name: 'User', schema: UserSchema},
      {name: 'Branch', schema: BranchSchema},
    ]),
    AuthModule,
  ],
  providers: [CompanyService],
  controllers: [CompanyController],
  exports: [CompanyService],
})
export class CompanyModule {}
