import {Module} from '@nestjs/common';
import {UserModule} from './modules/user/user.module';
import {DatabaseModule} from './modules/database/database.module';
import {AuthModule} from './modules/auth/auth.module';
import {CompanyModule} from './modules/company/company.module';
import {BranchModule} from './modules/branch/branch.module';
import { DirectorModule } from './modules/director/director.module';

@Module({
  imports: [UserModule, DatabaseModule, AuthModule, CompanyModule, BranchModule, DirectorModule],
})
export class AppModule {}
