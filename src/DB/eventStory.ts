import { IContractDto, IReportDto, IReportPaymentDto, IReportsReturnPaymentDto } from "../dto/IContractDto";
import { Events } from "./raise-event";
import ContractsModel from "./schema/contracts";
import ReportsModel from "./schema/reports";
import ReportsPaymentModel, { IReportsPayment } from "./schema/reportsPayment";
import ReportsReturnPaymentModel, { IReportsReturnPayment } from "./schema/reportsReturnPayment";

export const updatedEventStory = (updatedContracts: IContractDto, existedContract: ContractsModel | null) => {
  const compareObjects = (updatedObj: any, currentObj: any, reportIndex: any, reportPaymentIndex: any) => {
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
  };
  const compareReportsObjects = (updatedObj: any, currentObj: any, reportIndex: any) => {
    console.log("1first", reportIndex);

    for (const key in updatedObj) {
      if (key !== "id" && key !== "contractId" && key !== "reportId") {
        if (updatedObj[key] !== (currentObj?.[key] || 0)) {
          switch (key) {
            case "totalCost":
              events.push(Events.ReportTotalCost(reportIndex));
              break;

            case "reportDescription":
              events.push(Events.ReportReportDescription(reportIndex));
              break;

            case "presenter":
              events.push(Events.ReportPresenter(reportIndex));
              break;
            case "reportsReturnPayment":
              if (updatedContracts.reports[reportIndex].reportsReturnPayment.length > (existedContract?.reports?.[reportIndex]?.reportsReturnPayment?.length || 0)) {
                updatedContracts.reports[reportIndex].reportsReturnPayment.forEach((updatedObj, reportsReturnPaymentIndex) => {
                  if (reportsReturnPaymentIndex < (existedContract?.reports?.[reportIndex]?.reportsReturnPayment?.length || 0)) {
                    const currentObj = existedContract?.reports?.[reportIndex]?.reportsReturnPayment?.[reportsReturnPaymentIndex]?.dataValues;
                    compareReturnObjects(updatedObj, currentObj, reportIndex, reportsReturnPaymentIndex);
                  } else {
                    events.push(Events.ReportReturnPaymentCreated(reportIndex, reportsReturnPaymentIndex));
                  }
                });
              }
              if (updatedContracts.reports[reportIndex].reportsReturnPayment.length < (existedContract?.reports?.[reportIndex]?.reportsReturnPayment?.length || 0)) {
                existedContract?.reports?.[reportIndex]?.reportsReturnPayment.forEach((currentObj, reportReturnPaymentIndex) => {
                  if (reportReturnPaymentIndex < updatedContracts.reports[reportIndex].reportsReturnPayment.length) {
                    const updatedObj = updatedContracts.reports[reportIndex].reportsReturnPayment[reportReturnPaymentIndex];
                    compareReturnObjects(updatedObj, currentObj, reportIndex, reportReturnPaymentIndex);
                  } else {
                    events.push(Events.ReportReturnPaymentDeleted(reportIndex, reportReturnPaymentIndex));
                  }
                });
              }
              if (updatedContracts.reports[reportIndex].reportsReturnPayment.length === (existedContract?.reports?.[reportIndex]?.reportsReturnPayment?.length || 0)) {
                const CompareReturnPaymentsObjects = (currentArray: ReportsReturnPaymentModel[] | undefined, updatedArray: IReportsReturnPaymentDto[]) => {
                  updatedArray.forEach((_, reportReturnPaymentIndex) => {
                    const updatedObj: IReportsReturnPaymentDto = updatedArray?.[reportReturnPaymentIndex];
                    const currentObj: IReportsReturnPayment | undefined = currentArray?.[reportReturnPaymentIndex]?.dataValues;
                    for (const key in updatedObj) {
                      if (key !== "id" && key !== "contractId" && key !== "reportId") {
                        if (key === "dateReturnPayment") {
                          if (new Date(updatedObj[key]).getTime() !== new Date(currentObj?.[key] || 0).getTime()) {
                            events.push(Events.ReportReturnPaymentUpdated(reportIndex, reportReturnPaymentIndex, "dateReturnPayment"));
                          }
                        } else if (updatedObj[key] !== currentObj?.[key]) {
                          events.push(Events.ReportReturnPaymentUpdated(reportIndex, reportReturnPaymentIndex, key));
                          console.log(key, reportReturnPaymentIndex);
                        }
                      }
                    }
                  });
                };
                CompareReturnPaymentsObjects(existedContract?.reports?.[reportIndex]?.reportsReturnPayment, updatedContracts.reports[reportIndex]?.reportsReturnPayment);
              }
              break;
            case "reportsPayment":
              if (updatedContracts.reports[reportIndex].reportsPayment.length > (existedContract?.reports?.[reportIndex]?.reportsPayment?.length || 0)) {
                updatedContracts.reports[reportIndex].reportsPayment.forEach((updatedObj, reportPaymentIndex) => {
                  if (reportPaymentIndex < (existedContract?.reports?.[reportIndex]?.reportsPayment?.length || 0)) {
                    const currentObj = existedContract?.reports?.[reportIndex]?.reportsPayment?.[reportPaymentIndex]?.dataValues;
                    compareObjects(updatedObj, currentObj, reportIndex, reportPaymentIndex);
                  } else {
                    events.push(Events.ReportPaymentCreated(reportIndex, reportPaymentIndex));
                  }
                });
              }
              if (updatedContracts.reports[reportIndex].reportsPayment.length < (existedContract?.reports?.[reportIndex]?.reportsPayment?.length || 0)) {
                existedContract?.reports?.[reportIndex]?.reportsPayment.forEach((currentObj, reportPaymentIndex) => {
                  if (reportPaymentIndex < updatedContracts.reports[reportIndex].reportsPayment.length) {
                    const updatedObj = updatedContracts.reports[reportIndex].reportsPayment[reportPaymentIndex];
                    compareObjects(updatedObj, currentObj, reportIndex, reportPaymentIndex);
                  } else {
                    events.push(Events.ReportPaymentDeleted(reportIndex, reportPaymentIndex));
                  }
                });
              }
              if (updatedContracts.reports[reportIndex].reportsPayment.length === (existedContract?.reports?.[reportIndex]?.reportsPayment?.length || 0)) {
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
                ComparePaymentsObjects(existedContract?.reports?.[reportIndex].reportsPayment, updatedContracts.reports[reportIndex].reportsPayment);
              }
              break;
            default:
              "didnot set position ";
              break;
          }
        }
      }
    }
  };
  const compareReturnObjects = (updatedObj: any, currentObj: any, reportIndex: any, reportReturnPaymentIndex: any) => {
    for (const key in updatedObj) {
      if (key !== "id" && key !== "contractId" && key !== "reportId") {
        if (key === "dateReturnPayment") {
          if (new Date(updatedObj[key]).getTime() !== new Date(currentObj?.[key] || 0).getTime()) {
            events.push(Events.ReportReturnPaymentUpdated(reportIndex, reportReturnPaymentIndex, "dateReturnPayment"));
          }
        } else if (updatedObj[key] !== currentObj?.[key]) {
          events.push(Events.ReportReturnPaymentUpdated(reportIndex, reportReturnPaymentIndex, key));
        }
      }
    }
  };
  const events = [];
  if (updatedContracts.customer !== (existedContract?.dataValues.customer || 0)) {
    events.push(Events.ContractCustomerUpdated);
  }
  if (new Date(updatedContracts.dateContract).getTime() !== (existedContract?.dataValues?.dateContract?.getTime() || 0)) {
    events.push(Events.ContractDateContractUpdated);
  }
  if (updatedContracts.numContract !== (existedContract?.dataValues.numContract || 0)) {
    events.push(Events.ContractNumContractUpdated);
  }
  if (updatedContracts.typeContract !== (existedContract?.dataValues.typeContract || 0)) {
    events.push(Events.ContractTypeContractUpdated);
  }
  if (updatedContracts.reports?.length > (existedContract?.reports?.length || 0)) {
    updatedContracts.reports.forEach((updatedReport, reportIndex) => {
      const currentReport = existedContract?.reports?.[reportIndex]?.dataValues;
      if (reportIndex < (existedContract?.reports?.length || 0)) {
        compareReportsObjects(updatedReport, currentReport, reportIndex);
      } else {
        events.push(Events.ReportCreated);
      }
    });
  }
  if (updatedContracts.reports.length < (existedContract?.reports?.length || 0)) {
    events.push(Events.ReportDeleted);
  }
  if (updatedContracts.reports.length === (existedContract?.reports?.length || 0)) {
    updatedContracts.reports.forEach((_, reportIndex) => {
      if (updatedContracts.reports[reportIndex].totalCost !== (existedContract?.reports?.[reportIndex]?.totalCost || 0)) {
        events.push(Events.ReportTotalCost(reportIndex));
      }
      if (updatedContracts.reports[reportIndex].reportDescription !== (existedContract?.reports?.[reportIndex]?.reportDescription || 0)) {
        events.push(Events.ReportReportDescription(reportIndex));
      }
      if (updatedContracts.reports[reportIndex].presenter !== (existedContract?.reports?.[reportIndex]?.presenter || 0)) {
        events.push(Events.ReportPresenter(reportIndex));
      }
      if (updatedContracts.reports[reportIndex].reportsPayment.length > (existedContract?.reports?.[reportIndex]?.reportsPayment?.length || 0)) {
        updatedContracts.reports[reportIndex].reportsPayment.forEach((updatedObj, reportPaymentIndex) => {
          if (reportPaymentIndex < (existedContract?.reports?.[reportIndex]?.reportsPayment?.length || 0)) {
            const currentObj = existedContract?.reports?.[reportIndex]?.reportsPayment?.[reportPaymentIndex]?.dataValues;
            compareObjects(updatedObj, currentObj, reportIndex, reportPaymentIndex);
          } else {
            events.push(Events.ReportPaymentCreated(reportIndex, reportPaymentIndex));
          }
        });
      }
      if (updatedContracts.reports[reportIndex].reportsReturnPayment.length > (existedContract?.reports?.[reportIndex]?.reportsReturnPayment?.length || 0)) {
        updatedContracts.reports[reportIndex].reportsReturnPayment.forEach((updatedObj, reportsReturnPaymentIndex) => {
          if (reportsReturnPaymentIndex < (existedContract?.reports?.[reportIndex]?.reportsReturnPayment?.length || 0)) {
            const currentObj = existedContract?.reports?.[reportIndex]?.reportsReturnPayment?.[reportsReturnPaymentIndex]?.dataValues;
            compareReturnObjects(updatedObj, currentObj, reportIndex, reportsReturnPaymentIndex);
          } else {
            events.push(Events.ReportReturnPaymentCreated(reportIndex, reportsReturnPaymentIndex));
          }
        });
      }
      if (updatedContracts.reports[reportIndex].reportsPayment.length < (existedContract?.reports?.[reportIndex]?.reportsPayment?.length || 0)) {
        existedContract?.reports?.[reportIndex]?.reportsPayment.forEach((currentObj, reportPaymentIndex) => {
          if (reportPaymentIndex < updatedContracts.reports[reportIndex].reportsPayment.length) {
            const updatedObj = updatedContracts.reports[reportIndex].reportsPayment[reportPaymentIndex];
            compareObjects(updatedObj, currentObj, reportIndex, reportPaymentIndex);
          } else {
            events.push(Events.ReportPaymentDeleted(reportIndex, reportPaymentIndex));
          }
        });
      }
      if (updatedContracts.reports[reportIndex].reportsReturnPayment.length < (existedContract?.reports?.[reportIndex]?.reportsReturnPayment?.length || 0)) {
        existedContract?.reports?.[reportIndex]?.reportsReturnPayment.forEach((currentObj, reportReturnPaymentIndex) => {
          if (reportReturnPaymentIndex < updatedContracts.reports[reportIndex].reportsReturnPayment.length) {
            const updatedObj = updatedContracts.reports[reportIndex].reportsReturnPayment[reportReturnPaymentIndex];
            compareReturnObjects(updatedObj, currentObj, reportIndex, reportReturnPaymentIndex);
          } else {
            events.push(Events.ReportReturnPaymentDeleted(reportIndex, reportReturnPaymentIndex));
          }
        });
      }
      if (updatedContracts.reports[reportIndex].reportsPayment.length === (existedContract?.reports?.[reportIndex]?.reportsPayment?.length || 0)) {
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
        ComparePaymentsObjects(existedContract?.reports?.[reportIndex].reportsPayment, updatedContracts.reports[reportIndex].reportsPayment);
      }
      if (updatedContracts.reports[reportIndex].reportsReturnPayment.length === (existedContract?.reports?.[reportIndex]?.reportsReturnPayment?.length || 0)) {
        const CompareReturnPaymentsObjects = (currentArray: ReportsReturnPaymentModel[] | undefined, updatedArray: IReportsReturnPaymentDto[]) => {
          updatedArray.forEach((_, reportReturnPaymentIndex) => {
            const updatedObj: IReportsReturnPaymentDto = updatedArray?.[reportReturnPaymentIndex];
            const currentObj: IReportsReturnPayment | undefined = currentArray?.[reportReturnPaymentIndex]?.dataValues;
            for (const key in updatedObj) {
              if (key !== "id" && key !== "contractId" && key !== "reportId") {
                if (key === "dateReturnPayment") {
                  if (new Date(updatedObj[key]).getTime() !== new Date(currentObj?.[key] || 0).getTime()) {
                    events.push(Events.ReportReturnPaymentUpdated(reportIndex, reportReturnPaymentIndex, "dateReturnPayment"));
                  }
                } else if (updatedObj[key] !== currentObj?.[key]) {
                  events.push(Events.ReportReturnPaymentUpdated(reportIndex, reportReturnPaymentIndex, key));
                  console.log(key, reportReturnPaymentIndex);
                }
              }
            }
          });
        };
        CompareReturnPaymentsObjects(existedContract?.reports?.[reportIndex]?.reportsReturnPayment, updatedContracts.reports[reportIndex]?.reportsReturnPayment);
      }
    });
  }

  return events;
};
