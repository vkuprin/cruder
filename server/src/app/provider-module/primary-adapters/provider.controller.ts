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
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateProviderRequest } from '../application/data/requests/create-provider.request';
import { GetProviderByIdUsecase } from '../application/usecase/internal/get-provider-by-id.usecase';
import { GetProviderByDomainNameUsecase } from '../application/usecase/external/get-provider-by-domain-name.usecase';
import { GetProviderWithUsersUsecase } from '../application/usecase/internal/get-provider-with-users.usecase';
import { GetProvidersListUsecase } from '../application/usecase/internal/get-providers-list.usecase';
import { ProviderResponse } from '../application/data/responses/provider.response';
import { CreateProviderUsecase } from '../application/usecase/internal/create-provider.usecase';
import { DeleteProviderByIdUsecase } from '../application/usecase/internal/delete-provider-by-id.usecase';

@Controller('providers')
@ApiTags('Provider')
export class ProviderController {
  constructor(
    private readonly getProviderByIdUsecase: GetProviderByIdUsecase,
    private readonly getProviderByDomainNameUsecase: GetProviderByDomainNameUsecase,
    private readonly getProviderWithUsersUsecase: GetProviderWithUsersUsecase,
    private readonly getProvidersListUsecase: GetProvidersListUsecase,
    private readonly createProviderUsecase: CreateProviderUsecase,
    private readonly deleteProviderByIdUsecase: DeleteProviderByIdUsecase,
  ) {}

  @ApiSecurity('ApiKey')
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() body: CreateProviderRequest): Promise<ProviderResponse> {
    return this.createProviderUsecase.execute(body);
  }

  @Get(':id')
  async getById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ProviderResponse> {
    return this.getProviderByIdUsecase.execute(id);
  }

  @ApiSecurity('ApiKey')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProviderById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return this.deleteProviderByIdUsecase.execute(id);
  }

  @Get('byName/:domainName')
  async getByDomainName(
    @Param('domainName') domainName: string,
  ): Promise<ProviderResponse> {
    return this.getProviderByDomainNameUsecase.execute(domainName);
  }

  @ApiSecurity('ApiKey')
  @Get(':id/users')
  async getUsersOfProvider(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ProviderResponse> {
    return this.getProviderWithUsersUsecase.execute(id);
  }

  @Get()
  async getListOfProviders(): Promise<ProviderResponse[]> {
    return this.getProvidersListUsecase.execute();
  }
}
