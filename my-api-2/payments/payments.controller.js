var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Role } from '../src/generated/prisma/client.js';
import { CurrentUser, } from '../src/common/decorators/current-user.decorator.js';
import { Roles } from '../src/common/decorators/roles.decorator.js';
import { success } from '../src/common/http.js';
import { VerifyPaymentDto } from './dto/verify-payment.dto.js';
import { PaymentsService } from './payments.service.js';
let PaymentsController = class PaymentsController {
    payments;
    constructor(payments) {
        this.payments = payments;
    }
    async upload(user, billingId, file) {
        const data = await this.payments.uploadProof(user, billingId, file);
        return success(data, 'Bukti pembayaran diunggah');
    }
    async findAll(user) {
        const data = await this.payments.findAll(user);
        return success(data, 'Daftar pembayaran');
    }
    async findOne(user, id) {
        const data = await this.payments.findOne(user, id);
        return success(data, 'Detail pembayaran');
    }
    async verify(user, id, dto) {
        const data = await this.payments.verify(user, id, dto.action);
        return success(data, dto.action === 'APPROVE' ? 'Pembayaran disetujui' : 'Pembayaran ditolak');
    }
};
__decorate([
    Roles(Role.CUSTOMER),
    Post(),
    UseInterceptors(FileInterceptor('payment_proof', {
        storage: memoryStorage(),
        limits: { fileSize: 2 * 1024 * 1024 },
    })),
    __param(0, CurrentUser()),
    __param(1, Body('billing_id', ParseIntPipe)),
    __param(2, UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "upload", null);
__decorate([
    Get(),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "findOne", null);
__decorate([
    Roles(Role.ADMIN),
    Patch(':id/verify'),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseIntPipe)),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, VerifyPaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "verify", null);
PaymentsController = __decorate([
    Controller('payments'),
    __metadata("design:paramtypes", [PaymentsService])
], PaymentsController);
export { PaymentsController };
//# sourceMappingURL=payments.controller.js.map