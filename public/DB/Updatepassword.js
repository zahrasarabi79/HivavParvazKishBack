"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = __importDefault(require("./schema/users"));
const updatePassword = (username, password, oldPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.findOne({ where: { username } });
        console.log(user === null || user === void 0 ? void 0 : user.password);
        if (!user) {
            throw { status: 404, message: "User not found" };
        }
        else {
            const hashedOldPassword = yield bcrypt_1.default.hash(oldPassword, 10);
            console.log(hashedOldPassword);
            const result = yield bcrypt_1.default.compare(oldPassword, user === null || user === void 0 ? void 0 : user.password);
            if (result) {
                user.password = yield bcrypt_1.default.hash(password, 10);
                yield user.save();
                return { status: 200, message: "رمز عبور با موفقیت ویرایش شد" };
            }
            else {
                throw new Error("رمز عبور معتبر نیست");
            }
        }
    }
    catch (error) {
        console.error(error);
        throw { status: 500, message: error.message };
    }
});
exports.default = updatePassword;
