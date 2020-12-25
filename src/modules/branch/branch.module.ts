import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthModule} from '../auth/auth.module';
import {CompanyModule} from '../company/company.module';
import {BranchController} from './branch.controller';
import {BranchService} from './branch.service';
import {BranchSchema} from './schemas/branch.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Branch', schema: BranchSchema}]),
    AuthModule,
    CompanyModule,
  ],
  controllers: [BranchController],
  providers: [BranchService],
})
export class BranchModule {}
