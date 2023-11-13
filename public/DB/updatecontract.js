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
const contracts_1 = __importDefault(require("./schema/contracts"));
const reports_1 = __importDefault(require("./schema/reports"));
const reportsPayment_1 = __importDefault(require("./schema/reportsPayment"));
const reportsReturnPayment_1 = __importDefault(require("./schema/reportsReturnPayment"));
const updateData = ({ id, numContract, dateContract, customer, typeContract, reports }) => __awaiter(void 0, void 0, void 0, function* () {
    yield contracts_1.default.update({
        numContract,
        dateContract,
        typeContract,
        customer,
    }, {
        where: { id: id },
    });
    yield reports_1.default.destroy({
        where: { contractId: id },
    });
    let reportsModelData = reports.map(({ totalCost, reportDescription, presenter, reportsPayment, reportsReturnPayment }) => {
        let reportPaymentData = reportsPayment.map(({ bank, payments, datepayment, paymentDescription }) => {
            return { bank, payments, datepayment, contractId: id, paymentDescription };
        });
        let reportsReturnPaymentData = reportsReturnPayment.map(({ returnPaymentsbank, returnPayments, dateReturnPayment, returnPaymentDescription }) => {
            return { returnPaymentsbank, returnPayments, dateReturnPayment, contractId: id, returnPaymentDescription };
        });
        return {
            totalCost,
            reportDescription,
            presenter,
            reportsPayment: reportPaymentData,
            reportsReturnPayment: reportsReturnPaymentData,
            contractId: id,
        };
    });
    for (const reportData of reportsModelData) {
        const reportInstance = yield reports_1.default.create(reportData);
        // Create a single report instance for each reportData
        // Map and associate all reportsPayment data with the report instance
        const reportPayments = reportData.reportsPayment.map((payment) => (Object.assign(Object.assign({}, payment), { reportId: reportInstance.id, contractId: reportInstance.contractId })));
        // Map and associate all reportsReturnPayment data with the report instance
        const reportsReturnPayment = reportData.reportsReturnPayment.map((payment) => (Object.assign(Object.assign({}, payment), { reportId: reportInstance.id, contractId: reportInstance.contractId })));
        // Use bulkCreate to insert multiple payments and return payments in one go
        yield reportsPayment_1.default.bulkCreate(reportPayments);
        yield reportsReturnPayment_1.default.bulkCreate(reportsReturnPayment);
    }
});
exports.default = { updateData };
