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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const database = creatDbInstance();
function creatDbInstance() {
    return new sequelize_typescript_1.Sequelize({
        database: "pgs",
        dialect: "mysql",
        username: "root",
        password: "102030",
        models: [__dirname + "/schema"],
        logging: false,
    });
}
const creatTable = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database.authenticate();
        yield database.sync();
        console.log("creat database");
    }
    catch (error) {
        return console.log(error);
    }
});
exports.default = { creatTable, creatDbInstance, database };
