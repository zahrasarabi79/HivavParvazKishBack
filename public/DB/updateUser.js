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
const updateUserPassword = (id, name, username, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.findOne({ where: { id } });
        if (!user) {
            throw new Error("کاربر وجود ندارد");
        }
        if (user.password === password) {
            throw new Error("رمز عبور تکراری است");
        }
        if (password.trim() === "") {
            user.set({ name, username, password: user.password, role });
            yield user.save();
            return user;
        }
        else {
            bcrypt_1.default.hash(password, 10, (hashErr, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
                if (hashErr) {
                    console.error(hashErr);
                }
                else {
                    user.set({ name, username, password: hashedPassword, role });
                    yield user.save();
                    return user;
                }
            }));
        }
    }
    catch (error) {
        throw new Error(`${error.message}`);
    }
});
exports.default = updateUserPassword;
