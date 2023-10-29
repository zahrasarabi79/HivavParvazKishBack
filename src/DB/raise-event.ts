import Event from "./schema/event";

type Events = {
  ContractCreated: string;
  ReportCreated: string;
  ReportDeleted: string;
  ContractUpdated: string;
  ContractDeleted: string;
  ReportPaymentCreated: (ReportIndex: number) => string;
  ReportReturnPaymentCreated: (ReportIndex: number) => string;
  ReportPaymentDeleted: (ReportIndex: number) => string;
  ReportReturnPaymentDeleted: (ReportIndex: number) => string;
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
  ReportReturnPaymentUpdated: (ReportIndex, reportspayment, property) => `Report[${ReportIndex}]_returnReportspayment[${reportspayment}]_updated_${property}`,
  ReportPaymentCreated: (ReportIndex) => `ReportPayment_Report[${ReportIndex}]_Created`,
  ReportTotalCost: (ReportIndex) => `TotalCost_Report[${ReportIndex}]_Updated`,
  ReportPresenter: (ReportIndex) => `Presenter_Report[${ReportIndex}]_Updated`,
  ReportReportDescription: (ReportIndex) => `ReportDescription_Report[${ReportIndex}]_Updated`,
  ReportReturnPaymentCreated: (ReportIndex) => `ReportReturnPayment_Report[${ReportIndex}]_Created`,
  ReportPaymentDeleted: (ReportIndex) => `ReportPayment_Report[${ReportIndex}]_Deleted`,
  ReportReturnPaymentDeleted: (ReportIndex) => `ReportReturnPayment_Report[${ReportIndex}]_Deleted`,
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
