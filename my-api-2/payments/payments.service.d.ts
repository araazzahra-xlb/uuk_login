import type { AuthUser } from '../src/common/decorators/current-user.decorator.js';
import { FileStorageService } from '../src/file-storage/file-storage.service.js';
import { PaymentStatus } from '../src/generated/prisma/client.js';
import { PrismaService } from '../src/prisma/prisma.service.js';
export declare class PaymentsService {
    private readonly prisma;
    private readonly files;
    constructor(prisma: PrismaService, files: FileStorageService);
    uploadProof(user: AuthUser, billingId: number, file?: Express.Multer.File): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        status: PaymentStatus;
        billing_id: string;
        payment_proof: string;
        verified_by: string | null;
        verified_at: Date | null;
    }>;
    findAll(user: AuthUser): import("../src/generated/prisma/internal/prismaNamespace.js").PrismaPromise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        status: PaymentStatus;
        billing_id: string;
        payment_proof: string;
        verified_by: string | null;
        verified_at: Date | null;
    }[]>;
    findOne(user: AuthUser, id: number): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        status: PaymentStatus;
        billing_id: string;
        payment_proof: string;
        verified_by: string | null;
        verified_at: Date | null;
    }>;
    verify(admin: AuthUser, id: number, action: 'APPROVE' | 'REJECT'): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        status: PaymentStatus;
        billing_id: string;
        payment_proof: string;
        verified_by: string | null;
        verified_at: Date | null;
    }>;
    private assertFile;
}
