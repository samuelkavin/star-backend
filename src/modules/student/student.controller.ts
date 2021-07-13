import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {ApiResponse, ApiOperation, ApiTags, ApiParam} from '@nestjs/swagger';
import {StudentDto} from './dto/student.dto';
import {IStudent} from './interfaces/student.interface';
import {StudentService} from './student.service';

@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden'})
  @ApiOperation({
    operationId: 'createStudentProfile',
    summary: 'Create company profile',
  })
  @UsePipes(ValidationPipe)
  async createStudentProfile(@Body() createStudent: StudentDto): Promise<IStudent> {
    return this.studentService.createStudentProfile(createStudent);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all students list',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Get students validation is failed',
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
    operationId: 'getAllStudents',
    summary: 'Return all students list',
  })
  async getAllStudents(): Promise<IStudent[]> {
    return this.studentService.getAllStudents();
  }

  @Get(':studentId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return student by id',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Get particular student details',
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
    operationId: 'getStudentById',
    summary: 'Get staff profile details',
  })
  async getStudentById(@Param('studentId') studentId: string): Promise<IStudent> {
    return await this.studentService.getStudentById(studentId);
  }

  @Get('company/:companyId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return students by company id',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Get students attached to company',
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
    operationId: 'getStudentByCompanyId',
    summary: 'Get students list that attach to the company',
  })
  async getStudentByCompanyId(@Param('companyId') companyId: string): Promise<IStudent[]> {
    return await this.studentService.getStudentByCompanyId(companyId);
  }

  @Put(':studentId')
  @ApiParam({
    name: 'studentId',
    type: 'string',
    description: 'Student Id',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Update particular student details is failed',
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
    operationId: 'updateStudentDetails',
    summary: 'Update a particular student details',
  })
  async updateStudentDetails(
    @Param('studentId') studentId: string,
    @Body() body: StudentDto,
  ): Promise<any> {
    return this.studentService.updateStudentDetails(studentId, body);
  }
}
