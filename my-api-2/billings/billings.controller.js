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
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, } from '@nestjs/common';
import { Role } from '../src/generated/prisma/client.js';
import { CurrentUser, } from '../src/common/decorators/current-user.decorator.js';
import { Roles } from '../src/common/decorators/roles.decorator.js';
import { success } from '../src/common/http.js';
import { BillingsService } from './billings.service.js';
import { CreateBillingDto } from './dto/create-billing.dto.js';
import { UpdateBillingDto } from './dto/update-billing.dto.js';
let BillingsController = class BillingsController {
    billings;
    constructor(billings) {
        this.billings = billings;
    }
    async create(dto) {
        const data = await this.billings.create(dto);
        return success(data, 'Tagihan dibuat');
    }
    async findAll(user) {
        const data = await this.billings.findAll(user);
        return success(data, 'Daftar tagihan');
    }
    async findOne(user, id) {
        const data = await this.billings.findOne(user, id);
        return success(data, 'Detail tagihan');
    }
    async update(id, dto) {
        const data = await this.billings.update(id, dto);
        return success(data, 'Tagihan diperbarui');
    }
    async remove(id) {
        const data = await this.billings.remove(id);
        return success(data, 'Tagihan dihapus');
    }
};
__decorate([
    Roles(Role.ADMIN),
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateBillingDto]),
    __metadata("design:returntype", Promise)
], BillingsController.prototype, "create", null);
__decorate([
    Get(),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BillingsController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], BillingsController.prototype, "findOne", null);
__decorate([
    Roles(Role.ADMIN),
    Patch(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateBillingDto]),
    __metadata("design:returntype", Promise)
], BillingsController.prototype, "update", null);
__decorate([
    Roles(Role.ADMIN),
    Delete(':id'),
    __param(0, Param('id', ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BillingsController.prototype, "remove", null);
BillingsController = __decorate([
    Controller('billings'),
    __metadata("design:paramtypes", [BillingsService])
], BillingsController);
export { BillingsController };
//# sourceMappingURL=billings.controller.js.map