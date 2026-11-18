import type { AuthUser } from '../src/common/decorators/current-user.decorator.js';
import { BillingStatus, Prisma } from '../src/generated/prisma/client.js';
import { PrismaService } from '../src/prisma/prisma.service.js';
import { CreateBillingDto } from './dto/create-billing.dto.js';
import { UpdateBillingDto } from './dto/update-billing.dto.js';
export declare class BillingsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateBillingDto): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        period_month: number;
        period_year: number;
        due_date: Date;
        amount: import("@prisma/client-runtime-utils").Decimal;
        status: BillingStatus;
        subscription_id: string;
    }>;
    findAll(user: AuthUser): Prisma.PrismaPromise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        period_month: number;
        period_year: number;
        due_date: Date;
        amount: import("@prisma/client-runtime-utils").Decimal;
        status: BillingStatus;
        subscription_id: string;
    }[]>;
    findOne(user: AuthUser, id: number): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        period_month: number;
        period_year: number;
        due_date: Date;
        amount: import("@prisma/client-runtime-utils").Decimal;
        status: BillingStatus;
        subscription_id: string;
    }>;
    update(id: number, dto: UpdateBillingDto): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        period_month: number;
        period_year: number;
        due_date: Date;
        amount: import("@prisma/client-runtime-utils").Decimal;
        status: BillingStatus;
        subscription_id: string;
    }>;
    remove(id: number): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        period_month: number;
        period_year: number;
        due_date: Date;
        amount: import("@prisma/client-runtime-utils").Decimal;
        status: BillingStatus;
        subscription_id: string;
    }>;
    private assertMeter;
    private assertOwner;
    private handlePeriodUnique;
}
