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
    events.push(Events.ReportDeleted);
  } else {
    updatedReports.forEach((_, reportIndex) => {
      if (updatedReports[reportIndex].totalCost !== (existingReport?.[reportIndex]?.totalCost || 0)) {
        events.push(Events.ReportTotalCost(reportIndex));
      }
      if (updatedReports[reportIndex].reportDescription !== (existingReport?.[reportIndex]?.reportDescription || 0)) {
        events.push(Events.ReportReportDescription(reportIndex));
      }
      if (updatedReports[reportIndex].presenter !== (existingReport?.[reportIndex]?.presenter || 0)) {
        events.push(Events.ReportPresenter(reportIndex));
      }
      if (updatedReports[reportIndex].reportsPayment.length > (existingReport?.[reportIndex]?.reportsPayment?.length || 0)) {
        events.push(Events.ReportPaymentCreated(reportIndex));
      }
      if (updatedReports[reportIndex].reportsReturnPayment.length > (existingReport?.[reportIndex]?.reportsReturnPayment?.length || 0)) {
        events.push(Events.ReportReturnPaymentCreated(reportIndex));
      }
      if (updatedReports[reportIndex].reportsPayment.length < (existingReport?.[reportIndex]?.reportsPayment?.length || 0)) {
        events.push(Events.ReportPaymentDeleted(reportIndex));
      }
      if (updatedReports[reportIndex].reportsReturnPayment.length < (existingReport?.[reportIndex]?.reportsReturnPayment?.length || 0)) {
        events.push(Events.ReportReturnPaymentDeleted(reportIndex));
      }
      if (updatedReports[reportIndex].reportsPayment.length === (existingReport?.[reportIndex]?.reportsPayment?.length || 0)) {
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
        ComparePaymentsObjects(existingReport?.[reportIndex].reportsPayment, updatedReports[reportIndex].reportsPayment);
      }
      if (updatedReports[reportIndex].reportsReturnPayment.length === (existingReport?.[reportIndex]?.reportsReturnPayment?.length || 0)) {
        const CompareReturnPaymentsObjects = (currentArray: ReportsReturnPaymentModel[] | undefined, updatedArray: IReportsReturnPaymentDto[]) => {
          updatedArray.forEach((_, reportReturnPaymentIndex) => {
            const updatedObj: IReportsReturnPaymentDto = updatedArray[reportReturnPaymentIndex];
            const currentObj: IReportsReturnPayment | undefined = currentArray?.[reportReturnPaymentIndex]?.dataValues;
            for (const key in updatedObj) {
              if (key !== "id" && key !== "contractId" && key !== "reportId") {
                if (key === "dateReturnPayment") {
                  if (new Date(updatedObj[key]).getTime() !== new Date(currentObj?.[key] || 0).getTime()) {
                    events.push(Events.ReportReturnPaymentUpdated(reportIndex, reportReturnPaymentIndex, "datepayment"));
                  }
                } else if (updatedObj[key] !== currentObj?.[key]) {
                  events.push(Events.ReportReturnPaymentUpdated(reportIndex, reportReturnPaymentIndex, key));
                  console.log(key, reportReturnPaymentIndex);
                }
              }
            }
          });
        };
        CompareReturnPaymentsObjects(existingReport?.[reportIndex].reportsReturnPayment, updatedReports[reportIndex].reportsReturnPayment);
      }
    });
  }

  return events;
};
