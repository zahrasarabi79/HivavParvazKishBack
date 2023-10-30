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
exports.raiseEvent = exports.Events = void 0;
const event_1 = __importDefault(require("./schema/event"));
exports.Events = {
    ContractCreated: "contract_created",
    ReportCreated: "Report_created",
    ReportDeleted: "Report_deleted",
    ContractUpdated: "contract_updated",
    ContractDeleted: "contract_deleted",
    ContractCustomerUpdated: "contract_Customer_Updated",
    ContractDateContractUpdated: "contract_DateContract_Updated",
    ContractNumContractUpdated: "contract_NumContract_Updated",
    ContractTypeContractUpdated: "contract_TypeContrac_Updated",
    ReportReturnPaymentUpdated: (ReportIndex, reportspayment, property) => `Report[${ReportIndex}]_returnReportspayment[${reportspayment}]_updated_${property}`,
    ReportPaymentCreated: (ReportIndex, reportspayment) => `ReportPaymen[${reportspayment}]_Report[${ReportIndex}]_Created`,
    ReportTotalCost: (ReportIndex) => `TotalCost_Report[${ReportIndex}]_Updated`,
    ReportPresenter: (ReportIndex) => `Presenter_Report[${ReportIndex}]_Updated`,
    ReportReportDescription: (ReportIndex) => `ReportDescription_Report[${ReportIndex}]_Updated`,
    ReportReturnPaymentCreated: (ReportIndex, ReportReturnPayment) => `Report[${ReportIndex}]_ReportReturnPayment[${ReportReturnPayment}]_Created`,
    ReportPaymentDeleted: (ReportIndex, reportspayment) => `Report[${ReportIndex}]_ReportPaymen[${reportspayment}]_Deleted`,
    ReportReturnPaymentDeleted: (ReportIndex, ReportReturnPayment) => `Report[${ReportIndex}]_ReportReturnPayment[${ReportReturnPayment}]_Deleted`,
    ReportPaymentUpdated: (ReportIndex, reportspayment, property) => `Report[${ReportIndex}]_reportspayment[${reportspayment}]_updated_${property}`,
};
function raiseEvent(userId, contractId, eventName) {
    return __awaiter(this, void 0, void 0, function* () {
        yield event_1.default.create({
            eventName,
            userId,
            contractId,
        });
    });
}
exports.raiseEvent = raiseEvent;
exports.default = raiseEvent;
