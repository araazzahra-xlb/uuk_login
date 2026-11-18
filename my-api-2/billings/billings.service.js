var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, } from '@nestjs/common';
import { BillingStatus, Prisma, Role, } from '../src/generated/prisma/client.js';
import { PrismaService } from '../src/prisma/prisma.service.js';
const billingInclude = {
    electricity_account: {
        include: { electricity_service: true },
    },
    payment: true,
};
let BillingsService = class BillingsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        this.assertMeter(dto.previous_meter, dto.current_meter);
        const account = await this.prisma.electricityAccount.findUnique({
            where: { id: dto.electricity_account_id },
            include: { electricity_service: true },
        });
        if (!account) {
            throw new NotFoundException('Akun listrik tidak ditemukan');
        }
        const consumption = dto.current_meter - dto.previous_meter;
        const tariff = Number(account.electricity_service.price_per_kwh);
        const amount = consumption * tariff;
        try {
            return await this.prisma.billing.create({
                data: {
                    electricity_account_id: dto.electricity_account_id,
                    period_month: dto.period_month,
                    period_year: dto.period_year,
                    previous_meter: dto.previous_meter,
                    current_meter: dto.current_meter,
                    consumption,
                    tariff_per_kwh: tariff,
                    amount,
                    due_date: new Date(dto.due_date),
                    status: BillingStatus.UNPAID,
                },
                include: billingInclude,
            });
        }
        catch (error) {
            this.handlePeriodUnique(error);
            throw error;
        }
    }
    findAll(user) {
        return this.prisma.billing.findMany({
            where: user.role === Role.ADMIN
                ? undefined
                : { electricity_account: { user_id: user.id } },
            include: billingInclude,
            orderBy: [{ period_year: 'desc' }, { period_month: 'desc' }],
        });
    }
    async findOne(user, id) {
        const billing = await this.prisma.billing.findUnique({
            where: { id },
            include: billingInclude,
        });
        if (!billing) {
            throw new NotFoundException('Tagihan tidak ditemukan');
        }
        this.assertOwner(user, billing.electricity_account.user_id);
        return billing;
    }
    async update(id, dto) {
        const billing = await this.prisma.billing.findUnique({
            where: { id },
        });
        if (!billing) {
            throw new NotFoundException('Tagihan tidak ditemukan');
        }
        if (billing.status === BillingStatus.PAID) {
            throw new ConflictException('Tagihan yang sudah lunas tidak dapat diubah');
        }
        const previous = dto.previous_meter ?? Number(billing.previous_meter);
        const current = dto.current_meter ?? Number(billing.current_meter);
        this.assertMeter(previous, current);
        const consumption = current - previous;
        const amount = consumption * Number(billing.tariff_per_kwh);
        try {
            return await this.prisma.billing.update({
                where: { id },
                data: {
                    period_month: dto.period_month,
                    period_year: dto.period_year,
                    previous_meter: dto.previous_meter,
                    current_meter: dto.current_meter,
                    consumption,
                    amount,
                    due_date: dto.due_date ? new Date(dto.due_date) : undefined,
                },
                include: billingInclude,
            });
        }
        catch (error) {
            this.handlePeriodUnique(error);
            throw error;
        }
    }
    async remove(id) {
        const billing = await this.prisma.billing.findUnique({
            where: { id },
            include: { payment: true },
        });
        if (!billing) {
            throw new NotFoundException('Tagihan tidak ditemukan');
        }
        if (billing.payment) {
            throw new ConflictException('Tagihan tidak dapat dihapus karena sudah memiliki pembayaran');
        }
        return this.prisma.billing.delete({ where: { id } });
    }
    assertMeter(previous, current) {
        if (current < previous) {
            throw new BadRequestException('current_meter harus lebih besar atau sama dengan previous_meter');
        }
    }
    assertOwner(user, ownerId) {
        if (user.role !== Role.ADMIN && user.id !== ownerId) {
            throw new ForbiddenException('Anda tidak dapat mengakses tagihan ini');
        }
    }
    handlePeriodUnique(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2002') {
            throw new ConflictException('Billing untuk akun dan periode tersebut sudah ada');
        }
    }
};
BillingsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], BillingsService);
export { BillingsService };
//# sourceMappingURL=billings.service.js.map