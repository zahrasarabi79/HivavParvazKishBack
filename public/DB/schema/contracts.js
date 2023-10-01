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
const reports_1 = __importDefault(require("./reports"));
let ContractsModel = class ContractsModel extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ContractsModel.prototype, "numContract", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], ContractsModel.prototype, "dateContract", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ContractsModel.prototype, "typeContract", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], ContractsModel.prototype, "customer", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => reports_1.default),
    __metadata("design:type", Array)
], ContractsModel.prototype, "reports", void 0);
ContractsModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
    })
], ContractsModel);
exports.default = ContractsModel;
