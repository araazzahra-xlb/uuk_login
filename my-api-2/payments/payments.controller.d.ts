import { type AuthUser } from '../src/common/decorators/current-user.decorator.js';
import { VerifyPaymentDto } from './dto/verify-payment.dto.js';
import { PaymentsService } from './payments.service.js';
export declare class PaymentsController {
    private readonly payments;
    constructor(payments: PaymentsService);
    upload(user: AuthUser, billingId: number, file: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            created_at: Date;
            updated_at: Date;
            status: import("../src/generated/prisma/enums.js").PaymentStatus;
            billing_id: string;
            payment_proof: string;
            verified_by: string | null;
            verified_at: Date | null;
        };
    }>;
    findAll(user: AuthUser): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            created_at: Date;
            updated_at: Date;
            status: import("../src/generated/prisma/enums.js").PaymentStatus;
            billing_id: string;
            payment_proof: string;
            verified_by: string | null;
            verified_at: Date | null;
        }[];
    }>;
    findOne(user: AuthUser, id: number): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            created_at: Date;
            updated_at: Date;
            status: import("../src/generated/prisma/enums.js").PaymentStatus;
            billing_id: string;
            payment_proof: string;
            verified_by: string | null;
            verified_at: Date | null;
        };
    }>;
    verify(user: AuthUser, id: number, dto: VerifyPaymentDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            created_at: Date;
            updated_at: Date;
            status: import("../src/generated/prisma/enums.js").PaymentStatus;
            billing_id: string;
            payment_proof: string;
            verified_by: string | null;
            verified_at: Date | null;
        };
    }>;
}
