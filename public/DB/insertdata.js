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
const reportPayment_1 = __importDefault(require("./schema/reportPayment"));
const insertData = ({ dateContract, numContract, passengers, report, typeReport }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contract = yield contracts_1.default.create({
            numContract,
            dateContract,
            typeReport,
        });
        if (!contract)
            return false;
        let reportsModelData = report.map(({ costTitle, number, presenter, reportPayment }) => {
            let reportPaymentData = reportPayment.map(({ bank, payments, datepayment }) => {
                return { bank, payments, datepayment, contractId: contract.id };
            });
            return {
                costTitle,
                number,
                presenter,
                reportPayment: reportPaymentData,
                contractId: contract.id,
            };
        });
        for (const reportData of reportsModelData) {
            const reportInstance = yield report_1.default.create(reportData);
            const reportPayments = reportData.reportPayment.map((payment) => (Object.assign(Object.assign({}, payment), { reportId: reportInstance.id, contractId: reportInstance.contractId })));
            yield reportPayment_1.default.bulkCreate(reportPayments);
        }
        yield report_1.default.bulkCreate(reportsModelData);
        // let reportsModelData: IReportsModel[] = report.map(({ costTitle, number, presenter, reportPayment }) => {
        //   return {
        //     costTitle,
        //     number,
        //     presenter,
        //     reportPayment,
        //     contractId: contract.id,
        //   };
        // });
        // await ReportsModel.bulkCreate(reportsModelData);
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
