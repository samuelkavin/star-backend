import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import {StatusEnum} from 'src/utils/enums/status.enum';
import {BranchService} from './branch.service';
import {BranchDto} from './dto/branch.dto';

@ApiTags('Branches')
@Controller('branch')
export class BranchController {
  constructor(private branchService: BranchService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The branch has been successfully created',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    description: 'Internal server error',
    type: Error,
  })
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden'})
  @ApiOperation({
    operationId: 'createBranch',
    summary: 'Create a branch to profile',
  })
  @UsePipes(ValidationPipe)
  async createBranch(@Body() body: BranchDto): Promise<any> {
    const result = await this.branchService.createBranch(body);
    return result;
  }

  @Get(':branchId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all branches that belong to particular company',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Get particular branch details is failed',
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
    operationId: 'getBranch',
    summary: 'Get branch by Id',
  })
  async getCompanyBranches(@Param('branchId') branchId: string): Promise<any[]> {
    return await this.branchService.getBranchById(branchId);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all branches',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Get branch validation is failed',
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
    operationId: 'getAllBranches',
    summary: 'Return all branches list',
  })
  @ApiQuery({name: 'status', enum: StatusEnum, required: false})
  async getAllCompanies(@Query('status') status: StatusEnum): Promise<any[]> {
    console.log('user status', status);
    return this.branchService.getAllBranches();
  }

  @Put(':branchId')
  @ApiParam({
    name: 'branchId',
    type: 'string',
    description: 'branchId Id',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Update particular branch details is failed',
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
    operationId: 'updateBranchDetail',
    summary: 'Update a particular branch details',
  })
  async updateBranchDetails(
    @Param('companyId') companyId: string,
    @Body() body: BranchDto,
  ): Promise<any> {
    return this.branchService.updateBranchDetails(companyId, body);
  }
}
