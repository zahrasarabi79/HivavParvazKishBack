"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncCompare = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
function asyncCompare() {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.compare();
    });
}
exports.asyncCompare = asyncCompare;
