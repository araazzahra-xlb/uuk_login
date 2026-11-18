import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateServiceProviderDto } from './dto/create-service-provider.dto.js';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto.js';

@Injectable()
export class ServiceProvidersService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateServiceProviderDto) {
    return this.prisma.serviceProvider.create({
      data: {
        name: dto.name,
        description: dto.description,
        speed: dto.speed,
        price_per_month: dto.price_per_month,
        is_active: dto.is_active ?? true,
      },
    });
  }

  findAll(activeOnly = false) {
    return this.prisma.serviceProvider.findMany({
      where: activeOnly ? { is_active: true } : undefined,
      orderBy: { created_at: 'asc' },
    });
  }

  async findOne(id: string, activeOnly = false) {
    const provider = await this.prisma.serviceProvider.findUnique({ where: { id } });
    if (!provider || (activeOnly && !provider.is_active)) {
      throw new NotFoundException('Layanan internet tidak ditemukan');
    }
    return provider;
  }

  async update(id: string, dto: UpdateServiceProviderDto) {
    await this.findOne(id);
    return this.prisma.serviceProvider.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    const related = await this.prisma.subscription.count({
      where: { service_provider_id: id },
    });
    if (related > 0) {
      throw new ConflictException('Layanan tidak dapat dihapus karena sudah memiliki subscription');
    }
    return this.prisma.serviceProvider.delete({ where: { id } });
  }
}