import { IReportDto, IReportPaymentDto, IReportsReturnPaymentDto } from "../dto/IContractDto";
import { Events } from "./raise-event";
import ReportsModel from "./schema/reports";
import ReportsPaymentModel, { IReportsPayment } from "./schema/reportsPayment";
import ReportsReturnPaymentModel, { IReportsReturnPayment } from "./schema/reportsReturnPayment";

export const updatedEventStory = (updatedReports: IReportDto[], existingReport: ReportsModel[] | undefined) => {
  const events = [];
  if (updatedReports?.length > (existingReport?.length || 0)) {
    events.push(Events.ReportCreated);
  }
  if (updatedReports.length < (existingReport?.length || 0)) {
    events.push(Events.ContractDeleted);
  } else {
    updatedReports.forEach((_, reportIndex) => {
      if (updatedReports[reportIndex].reportsPayment.length > (existingReport?.[reportIndex]?.reportsPayment?.length || 0)) {
        events.push(Events.ReportPaymentCreated(reportIndex));
      }
      if (updatedReports[reportIndex].reportsPayment.length < (existingReport?.[reportIndex]?.reportsPayment?.length || 0)) {
        events.push(Events.ReportPaymentDeleted(reportIndex));
      } else {
        const ComparePaymentsObjects = (currentArray: ReportsPaymentModel[] | undefined, updatedArray: IReportPaymentDto[]) => {
          updatedArray.forEach((_, reportPaymentIndex) => {
            const updatedObj: IReportPaymentDto = updatedArray[reportPaymentIndex];
            const currentObj: IReportsPayment | undefined = currentArray?.[reportPaymentIndex]?.dataValues;
            for (const key in updatedObj) {
              if (key !== "id" && key !== "contractId" && key !== "reportId") {
                if (key === "datepayment") {
                  if (new Date(updatedObj[key]).getTime() !== new Date(currentObj?.[key] || 0).getTime()) {
                    events.push(Events.ReportPaymentUpdated(reportIndex, reportPaymentIndex, "datepayment"));
                  }
                } else if (updatedObj[key] !== currentObj?.[key]) {
                  events.push(Events.ReportPaymentUpdated(reportIndex, reportPaymentIndex, key));
                }
              }
            }
          });
        };
        const CompareReturnPaymentsObjects = (currentArray: ReportsReturnPaymentModel[] | undefined, updatedArray: IReportsReturnPaymentDto[]) => {
          updatedArray.forEach((_, reportReturnPaymentIndex) => {
            const updatedObj: IReportsReturnPaymentDto = updatedArray[reportReturnPaymentIndex];
            const currentObj: IReportsReturnPayment | undefined = currentArray?.[reportReturnPaymentIndex]?.dataValues;
            for (const key in updatedObj) {
              if (key !== "id" && key !== "contractId" && key !== "reportId") {
                if (key === "datepayment") {
                  if (new Date(updatedObj[key]).getTime() !== new Date(currentObj?.[key] || 0).getTime()) {
                    events.push(Events.ReportReturnPaymentUpdated(reportIndex, reportReturnPaymentIndex, "datepayment"));
                  }
                } else if (updatedObj[key] !== currentObj?.[key]) {
                  events.push(Events.ReportReturnPaymentUpdated(reportIndex, reportReturnPaymentIndex, key));
                }
              }
            }
          });
        };
        CompareReturnPaymentsObjects(existingReport?.[reportIndex].reportsReturnPayment, updatedReports[reportIndex].reportsReturnPayment);
        ComparePaymentsObjects(existingReport?.[reportIndex].reportsPayment, updatedReports[reportIndex].reportsPayment);
      }
    });
  }

  return events;
};
