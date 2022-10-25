import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateUserTypeUsecase } from '../application/usecase/internal/create-user-type.usecase';
import { GetUserTypesListUsecase } from '../application/usecase/internal/get-user-types-list.usecase';
import { GetUserTypeByIdUsecase } from '../application/usecase/internal/get-user-type-by-id.usecase';
import { DeleteUserTypeByIdUsecase } from '../application/usecase/internal/delete-user-type-by-id.usecase';
import { UpdateUserTypeByIdUsecase } from '../application/usecase/internal/update-user-type-by-id.usecase';
import { CreateUserTypeRequest } from '../application/data/requests/create-user-type.request';
import { UserTypeResponse } from '../application/data/responses/user-type.response';
import { UpdateUserTypeRequest } from '../application/data/requests/update-user-type.request';

@Controller('userTypes')
@ApiTags('User Type')
export class UserTypeController {
  constructor(
    private readonly createUserTypeUsecase: CreateUserTypeUsecase,
    private readonly getUserTypesListUsecase: GetUserTypesListUsecase,
    private readonly getUserTypeByIdUsecase: GetUserTypeByIdUsecase,
    private readonly deleteUserTypeByIdUsecase: DeleteUserTypeByIdUsecase,
    private readonly updateUserTypeByIdUsecase: UpdateUserTypeByIdUsecase,
  ) {}

  @ApiSecurity('ApiKey')
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() body: CreateUserTypeRequest): Promise<UserTypeResponse> {
    return this.createUserTypeUsecase.execute(body);
  }

  @ApiBearerAuth('BearerToken')
  @ApiSecurity('ApiKey')
  @Get()
  async getAll(): Promise<UserTypeResponse[]> {
    return this.getUserTypesListUsecase.execute();
  }

  @ApiSecurity('ApiKey')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.deleteUserTypeByIdUsecase.execute(id);
  }

  @ApiBearerAuth('BearerToken')
  @ApiSecurity('ApiKey')
  @Get(':id')
  async getById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserTypeResponse> {
    return this.getUserTypeByIdUsecase.execute(id);
  }

  @ApiSecurity('ApiKey')
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserTypeRequest,
  ): Promise<UserTypeResponse> {
    return this.updateUserTypeByIdUsecase.execute(id, body);
  }
}
