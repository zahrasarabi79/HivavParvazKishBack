import Event from "./schema/event";

type Events = {
  ContractCreated: string;
  ReportCreated: string;
  ReportDeleted: string;
  ContractUpdated: string;
  ContractDeleted: string;
  ContractCustomerUpdated: string;
  ContractDateContractUpdated: string;
  ContractNumContractUpdated: string;
  ContractTypeContractUpdated: string;
  ReportPaymentCreated: (ReportIndex: number, reportspayment: number) => string;
  ReportReturnPaymentCreated: (ReportIndex: number, ReportReturnPayment: number) => string;
  ReportPaymentDeleted: (ReportIndex: number, reportspayment: number) => string;
  ReportReturnPaymentDeleted: (ReportIndex: number, ReportReturnPayment: number) => string;
  ReportPaymentUpdated: (ReportIndex: number, reportspayment: number, property: string) => string;
  ReportReturnPaymentUpdated: (ReportIndex: number, reportspayment: number, property: string) => string;
  ReportTotalCost: (ReportIndex: number) => string;
  ReportPresenter: (ReportIndex: number) => string;
  ReportReportDescription: (ReportIndex: number) => string;
};

export const Events: Events = {
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
  ReportReturnPaymentCreated: (ReportIndex , ReportReturnPayment) =>`Report[${ReportIndex}]_ReportReturnPayment[${ReportReturnPayment}]_Created`,
  ReportPaymentDeleted: (ReportIndex, reportspayment) => `Report[${ReportIndex}]_ReportPaymen[${reportspayment}]_Deleted`,
  ReportReturnPaymentDeleted: (ReportIndex, ReportReturnPayment) => `Report[${ReportIndex}]_ReportReturnPayment[${ReportReturnPayment}]_Deleted`,
  ReportPaymentUpdated: (ReportIndex, reportspayment, property) => `Report[${ReportIndex}]_reportspayment[${reportspayment}]_updated_${property}`,
};

export async function raiseEvent(userId: number, contractId: number, eventName: string) {
  await Event.create({
    eventName,
    userId,
    contractId,
  });
}

export default raiseEvent;
