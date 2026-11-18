import { type AuthUser } from '../src/common/decorators/current-user.decorator.js';
import { BillingsService } from './billings.service.js';
import { CreateBillingDto } from './dto/create-billing.dto.js';
import { UpdateBillingDto } from './dto/update-billing.dto.js';
export declare class BillingsController {
    private readonly billings;
    constructor(billings: BillingsService);
    create(dto: CreateBillingDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            created_at: Date;
            updated_at: Date;
            period_month: number;
            period_year: number;
            due_date: Date;
            amount: import("@prisma/client-runtime-utils").Decimal;
            status: import("../src/generated/prisma/enums.js").BillingStatus;
            subscription_id: string;
        };
    }>;
    findAll(user: AuthUser): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            created_at: Date;
            updated_at: Date;
            period_month: number;
            period_year: number;
            due_date: Date;
            amount: import("@prisma/client-runtime-utils").Decimal;
            status: import("../src/generated/prisma/enums.js").BillingStatus;
            subscription_id: string;
        }[];
    }>;
    findOne(user: AuthUser, id: number): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            created_at: Date;
            updated_at: Date;
            period_month: number;
            period_year: number;
            due_date: Date;
            amount: import("@prisma/client-runtime-utils").Decimal;
            status: import("../src/generated/prisma/enums.js").BillingStatus;
            subscription_id: string;
        };
    }>;
    update(id: number, dto: UpdateBillingDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            created_at: Date;
            updated_at: Date;
            period_month: number;
            period_year: number;
            due_date: Date;
            amount: import("@prisma/client-runtime-utils").Decimal;
            status: import("../src/generated/prisma/enums.js").BillingStatus;
            subscription_id: string;
        };
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            created_at: Date;
            updated_at: Date;
            period_month: number;
            period_year: number;
            due_date: Date;
            amount: import("@prisma/client-runtime-utils").Decimal;
            status: import("../src/generated/prisma/enums.js").BillingStatus;
            subscription_id: string;
        };
    }>;
}
