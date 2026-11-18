import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Role } from '../generated/prisma/client.js';
import {
  CurrentUser,
  type AuthUser,
} from '../common/decorators/current-user.decorator.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { success } from '../common/http.js';
import { ServiceProvidersService } from './service-providers.service.js';
import { CreateServiceProviderDto } from './dto/create-service-provider.dto.js';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto.js';

@Controller('service-providers')
export class ServiceProvidersController {
  constructor(private readonly serviceProviders: ServiceProvidersService) {}

  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() dto: CreateServiceProviderDto) {
    const data = await this.serviceProviders.create(dto);
    return success(data, 'Layanan internet dibuat');
  }

  // ADMIN: semua paket. CUSTOMER: hanya paket yang aktif.
  @Get()
  async findAll(@CurrentUser() user: AuthUser) {
    const data = await this.serviceProviders.findAll(user.role !== Role.ADMIN);
    return success(data, 'Daftar layanan internet');
  }

  @Get(':id')
  async findOne(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const data = await this.serviceProviders.findOne(id, user.role !== Role.ADMIN);
    return success(data, 'Detail layanan internet');
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateServiceProviderDto,
  ) {
    const data = await this.serviceProviders.update(id, dto);
    return success(data, 'Layanan internet diperbarui');
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.serviceProviders.remove(id);
    return success(data, 'Layanan internet dihapus');
  }
}
