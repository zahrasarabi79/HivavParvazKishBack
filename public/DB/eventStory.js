"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedEventStory = void 0;
const raise_event_1 = require("./raise-event");
const updatedEventStory = (updatedReports, existingReport) => {
    const events = [];
    if ((updatedReports === null || updatedReports === void 0 ? void 0 : updatedReports.length) > ((existingReport === null || existingReport === void 0 ? void 0 : existingReport.length) || 0)) {
        events.push(raise_event_1.Events.ReportCreated);
    }
    if (updatedReports.length < ((existingReport === null || existingReport === void 0 ? void 0 : existingReport.length) || 0)) {
        events.push(raise_event_1.Events.ContractDeleted);
    }
    else {
        updatedReports.forEach((_, reportIndex) => {
            var _a, _b, _c, _d;
            if (updatedReports[reportIndex].reportsPayment.length > (((_b = (_a = existingReport === null || existingReport === void 0 ? void 0 : existingReport[reportIndex]) === null || _a === void 0 ? void 0 : _a.reportsPayment) === null || _b === void 0 ? void 0 : _b.length) || 0)) {
                events.push(raise_event_1.Events.ReportPaymentCreated(reportIndex));
            }
            if (updatedReports[reportIndex].reportsPayment.length < (((_d = (_c = existingReport === null || existingReport === void 0 ? void 0 : existingReport[reportIndex]) === null || _c === void 0 ? void 0 : _c.reportsPayment) === null || _d === void 0 ? void 0 : _d.length) || 0)) {
                events.push(raise_event_1.Events.ReportPaymentDeleted(reportIndex));
            }
            else {
                const ComparePaymentsObjects = (currentArray, updatedArray) => {
                    updatedArray.forEach((_, reportPaymentIndex) => {
                        var _a;
                        const updatedObj = updatedArray[reportPaymentIndex];
                        const currentObj = (_a = currentArray === null || currentArray === void 0 ? void 0 : currentArray[reportPaymentIndex]) === null || _a === void 0 ? void 0 : _a.dataValues;
                        for (const key in updatedObj) {
                            if (key !== "id" && key !== "contractId" && key !== "reportId") {
                                if (key === "datepayment") {
                                    if (new Date(updatedObj[key]).getTime() !== new Date((currentObj === null || currentObj === void 0 ? void 0 : currentObj[key]) || 0).getTime()) {
                                        events.push(raise_event_1.Events.ReportPaymentUpdated(reportIndex, reportPaymentIndex, "datepayment"));
                                    }
                                }
                                else if (updatedObj[key] !== (currentObj === null || currentObj === void 0 ? void 0 : currentObj[key])) {
                                    events.push(raise_event_1.Events.ReportPaymentUpdated(reportIndex, reportPaymentIndex, key));
                                }
                            }
                        }
                    });
                };
                const CompareReturnPaymentsObjects = (currentArray, updatedArray) => {
                    updatedArray.forEach((_, reportReturnPaymentIndex) => {
                        var _a;
                        const updatedObj = updatedArray[reportReturnPaymentIndex];
                        const currentObj = (_a = currentArray === null || currentArray === void 0 ? void 0 : currentArray[reportReturnPaymentIndex]) === null || _a === void 0 ? void 0 : _a.dataValues;
                        for (const key in updatedObj) {
                            if (key !== "id" && key !== "contractId" && key !== "reportId") {
                                if (key === "datepayment") {
                                    if (new Date(updatedObj[key]).getTime() !== new Date((currentObj === null || currentObj === void 0 ? void 0 : currentObj[key]) || 0).getTime()) {
                                        events.push(raise_event_1.Events.ReportReturnPaymentUpdated(reportIndex, reportReturnPaymentIndex, "datepayment"));
                                    }
                                }
                                else if (updatedObj[key] !== (currentObj === null || currentObj === void 0 ? void 0 : currentObj[key])) {
                                    events.push(raise_event_1.Events.ReportReturnPaymentUpdated(reportIndex, reportReturnPaymentIndex, key));
                                }
                            }
                        }
                    });
                };
                CompareReturnPaymentsObjects(existingReport === null || existingReport === void 0 ? void 0 : existingReport[reportIndex].reportsReturnPayment, updatedReports[reportIndex].reportsReturnPayment);
                ComparePaymentsObjects(existingReport === null || existingReport === void 0 ? void 0 : existingReport[reportIndex].reportsPayment, updatedReports[reportIndex].reportsPayment);
            }
        });
    }
    return events;
};
exports.updatedEventStory = updatedEventStory;
