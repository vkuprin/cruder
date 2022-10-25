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
import { SignInRequest } from '../application/data/requests/sign-in.request';
import { RefreshTokenRequest } from '../application/data/requests/refresh-token.request';
import { UpdateUserRequest } from '../application/data/requests/update-user.request';
import { GetUsersListUsecase } from '../application/usecase/internal/get-users-list.usecase';
import { UserResponse } from '../application/data/responses/user.response';
import { SignUpUsecase } from '../application/usecase/internal/sign-up.usecase';
import { SignInUsecase } from '../application/usecase/internal/sign-in.usecase';
import { SignInResponse } from '../application/data/responses/sign-in.response';
import { SignUpRequest } from '../application/data/requests/sign-up.request';
import { RefreshTokenUsecase } from '../application/usecase/internal/refresh-token.usecase';
import { RefreshTokenResponse } from '../application/data/responses/refresh-token.response';
import { GetUserByIdUsecase } from '../application/usecase/internal/get-user-by-id.usecase';
import { DeleteUserByIdUsecase } from '../application/usecase/internal/delete-user-by-id.usecase';
import { UpdateUserByIdUsecase } from '../application/usecase/internal/update-user-by-id.usecase';
import { UserInvitationsResponse } from '../application/data/responses/user-invitations.response';
import { GetUserInvitationsUsecase } from '../application/usecase/internal/get-user-invitations.usecase';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly getUsersListUsecase: GetUsersListUsecase,
    private readonly signUpUsecase: SignUpUsecase,
    private readonly signInUsecase: SignInUsecase,
    private readonly refreshTokenUsecase: RefreshTokenUsecase,
    private readonly getUserByIdUsecase: GetUserByIdUsecase,
    private readonly deleteUserByIdUsecase: DeleteUserByIdUsecase,
    private readonly updateUserByIdUsecase: UpdateUserByIdUsecase,
    private readonly getUserInvitationsUsecase: GetUserInvitationsUsecase,
  ) {}

  @ApiSecurity('ApiKey')
  @Get()
  async getListOfUsers(): Promise<UserResponse[]> {
    return this.getUsersListUsecase.execute();
  }

  @Post('signUp')
  @HttpCode(HttpStatus.OK)
  async signUp(@Body() body: SignUpRequest): Promise<UserResponse> {
    return this.signUpUsecase.execute(body);
  }

  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() body: SignInRequest): Promise<SignInResponse> {
    return this.signInUsecase.execute(body);
  }

  @Post('tokens/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Body() body: RefreshTokenRequest,
  ): Promise<RefreshTokenResponse> {
    return this.refreshTokenUsecase.execute(body);
  }

  @ApiBearerAuth('BearerToken')
  @ApiSecurity('ApiKey')
  @Get(':id')
  async getById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserResponse> {
    return this.getUserByIdUsecase.execute(id);
  }

  @ApiSecurity('ApiKey')
  @Get(':id/invitations')
  async getUserInvitations(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserInvitationsResponse> {
    return this.getUserInvitationsUsecase.execute(id);
  }

  @ApiSecurity('ApiKey')
  @Delete(':id')
  async removeById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.deleteUserByIdUsecase.execute(id);
  }

  @ApiBearerAuth('BearerToken')
  @ApiSecurity('ApiKey')
  @Put(':id')
  async updateUserById(
    @Body() body: UpdateUserRequest,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserResponse> {
    return this.updateUserByIdUsecase.execute(id, body);
  }
}
