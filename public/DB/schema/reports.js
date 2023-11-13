"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const contracts_1 = __importDefault(require("./contracts"));
const reportsPayment_1 = __importDefault(require("./reportsPayment"));
const reportsReturnPayment_1 = __importDefault(require("./reportsReturnPayment"));
let ReportsModel = class ReportsModel extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ReportsModel.prototype, "reportDescription", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ReportsModel.prototype, "totalCost", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ReportsModel.prototype, "presenter", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => reportsPayment_1.default),
    __metadata("design:type", Array)
], ReportsModel.prototype, "reportsPayment", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => reportsReturnPayment_1.default),
    __metadata("design:type", Array)
], ReportsModel.prototype, "reportsReturnPayment", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => contracts_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], ReportsModel.prototype, "contractId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => contracts_1.default),
    __metadata("design:type", contracts_1.default)
], ReportsModel.prototype, "contract", void 0);
ReportsModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
    })
], ReportsModel);
exports.default = ReportsModel;
