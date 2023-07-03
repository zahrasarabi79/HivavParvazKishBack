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
let PassengersModel = class PassengersModel extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], PassengersModel.prototype, "passenger", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => contracts_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], PassengersModel.prototype, "contractId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => contracts_1.default),
    __metadata("design:type", Object)
], PassengersModel.prototype, "contract", void 0);
PassengersModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
    })
], PassengersModel);
exports.default = PassengersModel;
