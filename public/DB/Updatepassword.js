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
        if (!user) {
            throw new Error("User not found");
        }
        else {
            bcrypt_1.default.compare(oldPassword, user.password, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    console.error(err, "eeee");
                }
                else if (result) {
                    user.password = password;
                    yield user.save();
                    return user;
                }
                else {
                    throw new Error("رمز عبور معتبر نیست");
                }
            }));
        }
    }
    catch (error) {
        throw new Error(`${error.message}`);
    }
});
exports.default = updatePassword;
