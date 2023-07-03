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
const report_1 = __importDefault(require("./schema/report"));
const passengers_1 = __importDefault(require("./schema/passengers"));
const contracts_1 = __importDefault(require("./schema/contracts"));
const insertData = ({ dateContract, numContract, passengers, report, typeReport, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contract = yield contracts_1.default.create({
            numContract: numContract,
            dateContract: dateContract,
            typeReport: typeReport,
        });
        if (!contract)
            return false;
        let reportsModelData = report.map(({ bank, costTitle, datepayment, number, payments, presenter }) => {
            return {
                costTitle,
                datepayment,
                number,
                payments,
                presenter,
                bank,
                contractId: contract.id,
            };
        });
        yield report_1.default.bulkCreate(reportsModelData);
        let passengersModelData = passengers.map((passenger) => {
            return { passenger, contractId: contract.id };
        });
        yield passengers_1.default.bulkCreate(passengersModelData);
        return contract;
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = { insertData };
