import {
  Body,
  Controller,
  Get,
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
import {DirectorService} from './director.service';
import {DirectorDto} from './dto/director.dto';
import {IDirector} from './interfaces/director.interface';

@ApiTags('Director')
@Controller('director')
export class DirectorController {
  constructor(private directorService: DirectorService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({status: HttpStatus.FORBIDDEN, description: 'Forbidden'})
  @ApiOperation({
    operationId: 'createDirector',
    summary: 'Create director profile',
  })
  @UsePipes(ValidationPipe)
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard())
  async createDirector(
    @Body() createDirector: DirectorDto,
    // @GetUser() user: User,
  ): Promise<IDirector> {
    return this.directorService.createDirector(createDirector);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all directors list',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: Error,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Get directors validation is failed',
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
    operationId: 'getAllDirectors',
    summary: 'Return all director list',
  })
  async getAllDirectors(): Promise<IDirector[]> {
    return this.directorService.getAllDirectors();
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
    operationId: 'getDirectorsByCompanyId',
    summary: 'Get directors list that attach to the company',
  })
  async getDirectorsByCompanyId(@Param('companyId') companyId: string): Promise<IDirector[]> {
    return await this.directorService.getDirectorsByCompanyId(companyId);
  }
}
