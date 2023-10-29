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
        events.push(raise_event_1.Events.ReportDeleted);
    }
    else {
        updatedReports.forEach((_, reportIndex) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
            if (updatedReports[reportIndex].totalCost !== (((_a = existingReport === null || existingReport === void 0 ? void 0 : existingReport[reportIndex]) === null || _a === void 0 ? void 0 : _a.totalCost) || 0)) {
                events.push(raise_event_1.Events.ReportTotalCost(reportIndex));
            }
            if (updatedReports[reportIndex].reportDescription !== (((_b = existingReport === null || existingReport === void 0 ? void 0 : existingReport[reportIndex]) === null || _b === void 0 ? void 0 : _b.reportDescription) || 0)) {
                events.push(raise_event_1.Events.ReportReportDescription(reportIndex));
            }
            if (updatedReports[reportIndex].presenter !== (((_c = existingReport === null || existingReport === void 0 ? void 0 : existingReport[reportIndex]) === null || _c === void 0 ? void 0 : _c.presenter) || 0)) {
                events.push(raise_event_1.Events.ReportPresenter(reportIndex));
            }
            if (updatedReports[reportIndex].reportsPayment.length > (((_e = (_d = existingReport === null || existingReport === void 0 ? void 0 : existingReport[reportIndex]) === null || _d === void 0 ? void 0 : _d.reportsPayment) === null || _e === void 0 ? void 0 : _e.length) || 0)) {
                events.push(raise_event_1.Events.ReportPaymentCreated(reportIndex));
            }
            if (updatedReports[reportIndex].reportsReturnPayment.length > (((_g = (_f = existingReport === null || existingReport === void 0 ? void 0 : existingReport[reportIndex]) === null || _f === void 0 ? void 0 : _f.reportsReturnPayment) === null || _g === void 0 ? void 0 : _g.length) || 0)) {
                events.push(raise_event_1.Events.ReportReturnPaymentCreated(reportIndex));
            }
            if (updatedReports[reportIndex].reportsPayment.length < (((_j = (_h = existingReport === null || existingReport === void 0 ? void 0 : existingReport[reportIndex]) === null || _h === void 0 ? void 0 : _h.reportsPayment) === null || _j === void 0 ? void 0 : _j.length) || 0)) {
                events.push(raise_event_1.Events.ReportPaymentDeleted(reportIndex));
            }
            if (updatedReports[reportIndex].reportsReturnPayment.length < (((_l = (_k = existingReport === null || existingReport === void 0 ? void 0 : existingReport[reportIndex]) === null || _k === void 0 ? void 0 : _k.reportsReturnPayment) === null || _l === void 0 ? void 0 : _l.length) || 0)) {
                events.push(raise_event_1.Events.ReportReturnPaymentDeleted(reportIndex));
            }
            if (updatedReports[reportIndex].reportsPayment.length === (((_o = (_m = existingReport === null || existingReport === void 0 ? void 0 : existingReport[reportIndex]) === null || _m === void 0 ? void 0 : _m.reportsPayment) === null || _o === void 0 ? void 0 : _o.length) || 0)) {
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
                ComparePaymentsObjects(existingReport === null || existingReport === void 0 ? void 0 : existingReport[reportIndex].reportsPayment, updatedReports[reportIndex].reportsPayment);
            }
            if (updatedReports[reportIndex].reportsReturnPayment.length === (((_q = (_p = existingReport === null || existingReport === void 0 ? void 0 : existingReport[reportIndex]) === null || _p === void 0 ? void 0 : _p.reportsReturnPayment) === null || _q === void 0 ? void 0 : _q.length) || 0)) {
                const CompareReturnPaymentsObjects = (currentArray, updatedArray) => {
                    updatedArray.forEach((_, reportReturnPaymentIndex) => {
                        var _a;
                        const updatedObj = updatedArray[reportReturnPaymentIndex];
                        const currentObj = (_a = currentArray === null || currentArray === void 0 ? void 0 : currentArray[reportReturnPaymentIndex]) === null || _a === void 0 ? void 0 : _a.dataValues;
                        for (const key in updatedObj) {
                            if (key !== "id" && key !== "contractId" && key !== "reportId") {
                                if (key === "dateReturnPayment") {
                                    if (new Date(updatedObj[key]).getTime() !== new Date((currentObj === null || currentObj === void 0 ? void 0 : currentObj[key]) || 0).getTime()) {
                                        events.push(raise_event_1.Events.ReportReturnPaymentUpdated(reportIndex, reportReturnPaymentIndex, "datepayment"));
                                    }
                                }
                                else if (updatedObj[key] !== (currentObj === null || currentObj === void 0 ? void 0 : currentObj[key])) {
                                    events.push(raise_event_1.Events.ReportReturnPaymentUpdated(reportIndex, reportReturnPaymentIndex, key));
                                    console.log(key, reportReturnPaymentIndex);
                                }
                            }
                        }
                    });
                };
                CompareReturnPaymentsObjects(existingReport === null || existingReport === void 0 ? void 0 : existingReport[reportIndex].reportsReturnPayment, updatedReports[reportIndex].reportsReturnPayment);
            }
        });
    }
    return events;
};
exports.updatedEventStory = updatedEventStory;
