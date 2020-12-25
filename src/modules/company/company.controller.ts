import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {StatusEnum} from 'src/utils/enums/status.enum';
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

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all profiles list',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Get profiles validation is failed',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    description: 'Internal communication error',
    type: Error,
  })
  @ApiOperation({
    operationId: 'getAllProfiles',
    summary: 'Return all profiles list',
  })
  @ApiQuery({name: 'status', enum: StatusEnum, required: false})
  async getAllCompanies(@Query('status') status: StatusEnum): Promise<ICompany[]> {
    console.log('user status', status);
    return this.companyService.getAllCompanies();
  }

  @Get(':companyId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return company by id',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Get particular company details',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    description: 'Internal communication error',
    type: Error,
  })
  @ApiOperation({
    operationId: 'getCompanyById',
    summary: 'Get single profile details',
  })
  async getCompanyById(@Param('companyId') companyId: string): Promise<ICompany> {
    return await this.companyService.getCompanyById(companyId);
  }

  @Put(':companyId')
  @ApiParam({
    name: 'companyId',
    type: 'string',
    description: 'company Id',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Update particular company details is failed',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    description: 'Internal communication error',
    type: Error,
  })
  @ApiOperation({
    operationId: 'updateCompanyProfile',
    summary: 'Update a particular company details',
  })
  async updateCompanyProfile(
    @Param('companyId') companyId: string,
    @Body() body: CompanyDto,
  ): Promise<any> {
    return this.companyService.updateCompanyDetail(companyId, body);
  }
}
