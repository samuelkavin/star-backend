import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';
import {GetUser} from '../auth/decorators/get-user.decorator';
import {User} from '../user/interfaces/user.interface';
import {StaffDto} from './dto/staff.dto';
import {IStaff} from './interfaces/staff.interface';
import {StaffService} from './staff.service';

@Controller('staff')
@ApiTags('Staff')
export class StaffController {
  constructor(private staffService: StaffService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden'})
  @ApiOperation({
    operationId: 'createStaffProfile',
    summary: 'Create company profile',
  })
  //   @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  //   @UseGuards(AuthGuard())
  async createStaffProfile(@Body() createStaff: StaffDto): Promise<IStaff> {
    return this.staffService.createStaffProfile(createStaff);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all staff list',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Get staff validation is failed',
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
    operationId: 'getAllStaff',
    summary: 'Return all staff list',
  })
  async getAllStaff(): Promise<IStaff[]> {
    return this.staffService.getAllStaff();
  }

  @Get(':staffId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return staff by id',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Get particular staff details',
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
    operationId: 'getStaffById',
    summary: 'Get staff profile details',
  })
  async getStaffById(@Param('staffId') staffId: string): Promise<IStaff> {
    return await this.staffService.getStaffById(staffId);
  }

  @Put(':staffId')
  @ApiParam({
    name: 'staffId',
    type: 'string',
    description: 'staffId Id',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Update particular staff details is failed',
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
    operationId: 'updateStaffDetail',
    summary: 'Update a particular staff details',
  })
  async updateStaffDetail(@Param('staffId') staffId: string, @Body() body: StaffDto): Promise<any> {
    return this.staffService.updateStaffDetail(staffId, body);
  }

  @Get('company/:companyId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return staffs by id',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Get particular staff details',
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
    operationId: 'getStaffByCompanyId',
    summary: 'Get staff list that attach to the company',
  })
  async getStaffByCompanyId(@Param('companyId') companyId: string): Promise<IStaff[]> {
    return await this.staffService.getStaffByCompanyId(companyId);
  }
}
