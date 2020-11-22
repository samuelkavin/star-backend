import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {GetUser} from '../auth/decorators/get-user.decorator';
import {User} from '../user/interfaces/user.interface';
import {CompanyService} from './company.service';
import {CompanyDto} from './dto/company.dto';
import {ICompany} from './interfaces/company.interface';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden'})
  @ApiOperation({
    operationId: 'createCompanyProfile',
    summary: 'Create company profile',
  })
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  async createCompanyProfile(
    @Body() createBusinessProfile: CompanyDto,
    @GetUser() user: User,
  ): Promise<ICompany> {
    console.log('user createCompanyProfile', user);
    return this.companyService.createCompanyProfile(createBusinessProfile);
  }
}
