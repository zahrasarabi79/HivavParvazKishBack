import Event from "./schema/event";

type Events = {
  ContractCreated: string;
  ReportCreated: string;
  ReportReturnPaymentUpdated: (ReportIndex: number, reportspayment: number, property: string) => string;
  ReportPaymentCreated: (ReportIndex: number) => string;
  ReportPaymentDeleted: (ReportIndex: number) => string;
  ReportPaymentUpdated: (ReportIndex: number, reportspayment: number, property: string) => string;
  ReportDeleted: string;
  ContractUpdated: string;
  ContractDeleted: string;
};

export const Events: Events = {
  ContractCreated: "contract_created",
  ReportCreated: "Report_created",
  ReportReturnPaymentUpdated: (ReportIndex: number, reportspayment: number, property: string) => `Report[${ReportIndex}]_returnReportspayment[${reportspayment}_updated_${property}]`,
  ReportPaymentCreated: (ReportIndex: number) => `ReportPayment_Report[${ReportIndex}]_Created`,
  ReportPaymentDeleted: (ReportIndex: number) => `ReportPayment_Report[${ReportIndex}]_Deleted`,
  ReportPaymentUpdated: (ReportIndex: number, reportspayment: number, property: string) => `Report[${ReportIndex}]_reportspayment[${reportspayment}]_updated_${property}`,
  ReportDeleted: "Report_deleted",
  ContractUpdated: "contract_updated",
  ContractDeleted: "contract_deleted",
};

export async function raiseEvent(userId: number, contractId: number, eventName: string) {
  await Event.create({
    eventName,
    userId,
    contractId,
  });
}

export default raiseEvent;
