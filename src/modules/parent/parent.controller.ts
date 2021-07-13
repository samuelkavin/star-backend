import {Body, Controller, Get, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ParentDto} from './dto/parent.dto';
import {IParent} from './interfaces/parent.interface';
import {ParentService} from './parent.service';

@ApiTags('Parent')
@Controller('parent')
export class ParentController {
  constructor(private parentService: ParentService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden'})
  @ApiOperation({
    operationId: 'createParent',
    summary: 'Create parent profile',
  })
  async createStudentProfile(@Body() createParent: ParentDto): Promise<IParent> {
    return this.parentService.createParent(createParent);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all parents list',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Get parents validation is failed',
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
    operationId: 'getAllParents',
    summary: 'Return all parents list',
  })
  async getAllParents(): Promise<IParent[]> {
    return this.parentService.getAllParents();
  }

  @Get(':parentId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return parent by id',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Get particular parent details',
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
    operationId: 'getParentById',
    summary: 'Get parent profile details',
  })
  async getParentyId(@Param('parentId') parentId: string): Promise<IParent> {
    return await this.parentService.getParentById(parentId);
  }

  @Put(':parentId')
  @ApiParam({
    name: 'parentId',
    type: 'string',
    description: 'Parent Id',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Update particular parent details is failed',
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
    operationId: 'updateParentDetails',
    summary: 'Update a particular parent details',
  })
  async updateParentDetails(
    @Param('parentId') parentId: string,
    @Body() body: ParentDto,
  ): Promise<any> {
    return this.parentService.updateParentDetails(parentId, body);
  }
}
