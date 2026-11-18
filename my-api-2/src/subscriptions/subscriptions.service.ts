import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { AuthUser } from '../common/decorators/current-user.decorator.js';
import { Role, SubscriptionStatus } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateSubscriptionDto } from './dto/create-subscription.dto.js';

// password user tidak boleh ikut keluar
const subscriptionInclude = {
  user: { select: { id: true, name: true, email: true } },
  service_provider: true,
} as const;

@Injectable()
export class SubscriptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateSubscriptionDto) {
    const provider = await this.prisma.serviceProvider.findUnique({
      where: { id: dto.service_provider_id },
    });
    if (!provider) {
      throw new NotFoundException('Layanan internet tidak ditemukan');
    }
    if (!provider.is_active) {
      throw new BadRequestException('Layanan internet tidak aktif');
    }

    const existing = await this.prisma.subscription.findFirst({
      where: {
        user_id: userId,
        service_provider_id: dto.service_provider_id,
        status: SubscriptionStatus.ACTIVE,
      },
    });
    if (existing) {
      throw new ConflictException(
        'Anda sudah berlangganan layanan ini dan masih aktif',
      );
    }

    return this.prisma.subscription.create({
      data: {
        user_id: userId,
        service_provider_id: dto.service_provider_id,
        status: SubscriptionStatus.ACTIVE,
      },
      include: subscriptionInclude,
    });
  }

  findAll(user: AuthUser) {
    return this.prisma.subscription.findMany({
      where: user.role === Role.ADMIN ? undefined : { user_id: user.id },
      include: subscriptionInclude,
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(user: AuthUser, id: string) {
    const subscription = await this.prisma.subscription.findUnique({
      where: { id },
      include: subscriptionInclude,
    });
    if (!subscription) {
      throw new NotFoundException('Subscription tidak ditemukan');
    }
    if (user.role !== Role.ADMIN && subscription.user_id !== user.id) {
      throw new ForbiddenException('Anda tidak dapat mengakses subscription ini');
    }
    return subscription;
  }
}
