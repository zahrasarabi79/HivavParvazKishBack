"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedEventStory = void 0;
const raise_event_1 = require("./raise-event");
const updatedEventStory = (updatedContracts, existedContract) => {
    var _a, _b, _c, _d, _e, _f;
    const compareObjects = (updatedObj, currentObj, reportIndex, reportPaymentIndex) => {
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
    };
    const compareReportsObjects = (updatedObj, currentObj, reportIndex) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1;
        console.log("1first", reportIndex);
        for (const key in updatedObj) {
            if (key !== "id" && key !== "contractId" && key !== "reportId") {
                if (updatedObj[key] !== ((currentObj === null || currentObj === void 0 ? void 0 : currentObj[key]) || 0)) {
                    switch (key) {
                        case "totalCost":
                            events.push(raise_event_1.Events.ReportTotalCost(reportIndex));
                            break;
                        case "reportDescription":
                            events.push(raise_event_1.Events.ReportReportDescription(reportIndex));
                            break;
                        case "presenter":
                            events.push(raise_event_1.Events.ReportPresenter(reportIndex));
                            break;
                        case "reportsReturnPayment":
                            if (updatedContracts.reports[reportIndex].reportsReturnPayment.length > (((_c = (_b = (_a = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _a === void 0 ? void 0 : _a[reportIndex]) === null || _b === void 0 ? void 0 : _b.reportsReturnPayment) === null || _c === void 0 ? void 0 : _c.length) || 0)) {
                                updatedContracts.reports[reportIndex].reportsReturnPayment.forEach((updatedObj, reportsReturnPaymentIndex) => {
                                    var _a, _b, _c, _d, _e, _f, _g;
                                    if (reportsReturnPaymentIndex < (((_c = (_b = (_a = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _a === void 0 ? void 0 : _a[reportIndex]) === null || _b === void 0 ? void 0 : _b.reportsReturnPayment) === null || _c === void 0 ? void 0 : _c.length) || 0)) {
                                        const currentObj = (_g = (_f = (_e = (_d = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _d === void 0 ? void 0 : _d[reportIndex]) === null || _e === void 0 ? void 0 : _e.reportsReturnPayment) === null || _f === void 0 ? void 0 : _f[reportsReturnPaymentIndex]) === null || _g === void 0 ? void 0 : _g.dataValues;
                                        compareReturnObjects(updatedObj, currentObj, reportIndex, reportsReturnPaymentIndex);
                                    }
                                    else {
                                        events.push(raise_event_1.Events.ReportReturnPaymentCreated(reportIndex, reportsReturnPaymentIndex));
                                    }
                                });
                            }
                            if (updatedContracts.reports[reportIndex].reportsReturnPayment.length < (((_f = (_e = (_d = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _d === void 0 ? void 0 : _d[reportIndex]) === null || _e === void 0 ? void 0 : _e.reportsReturnPayment) === null || _f === void 0 ? void 0 : _f.length) || 0)) {
                                (_h = (_g = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _g === void 0 ? void 0 : _g[reportIndex]) === null || _h === void 0 ? void 0 : _h.reportsReturnPayment.forEach((currentObj, reportReturnPaymentIndex) => {
                                    if (reportReturnPaymentIndex < updatedContracts.reports[reportIndex].reportsReturnPayment.length) {
                                        const updatedObj = updatedContracts.reports[reportIndex].reportsReturnPayment[reportReturnPaymentIndex];
                                        compareReturnObjects(updatedObj, currentObj, reportIndex, reportReturnPaymentIndex);
                                    }
                                    else {
                                        events.push(raise_event_1.Events.ReportReturnPaymentDeleted(reportIndex, reportReturnPaymentIndex));
                                    }
                                });
                            }
                            if (updatedContracts.reports[reportIndex].reportsReturnPayment.length === (((_l = (_k = (_j = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _j === void 0 ? void 0 : _j[reportIndex]) === null || _k === void 0 ? void 0 : _k.reportsReturnPayment) === null || _l === void 0 ? void 0 : _l.length) || 0)) {
                                const CompareReturnPaymentsObjects = (currentArray, updatedArray) => {
                                    updatedArray.forEach((_, reportReturnPaymentIndex) => {
                                        var _a;
                                        const updatedObj = updatedArray === null || updatedArray === void 0 ? void 0 : updatedArray[reportReturnPaymentIndex];
                                        const currentObj = (_a = currentArray === null || currentArray === void 0 ? void 0 : currentArray[reportReturnPaymentIndex]) === null || _a === void 0 ? void 0 : _a.dataValues;
                                        for (const key in updatedObj) {
                                            if (key !== "id" && key !== "contractId" && key !== "reportId") {
                                                if (key === "dateReturnPayment") {
                                                    if (new Date(updatedObj[key]).getTime() !== new Date((currentObj === null || currentObj === void 0 ? void 0 : currentObj[key]) || 0).getTime()) {
                                                        events.push(raise_event_1.Events.ReportReturnPaymentUpdated(reportIndex, reportReturnPaymentIndex, "dateReturnPayment"));
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
                                CompareReturnPaymentsObjects((_o = (_m = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _m === void 0 ? void 0 : _m[reportIndex]) === null || _o === void 0 ? void 0 : _o.reportsReturnPayment, (_p = updatedContracts.reports[reportIndex]) === null || _p === void 0 ? void 0 : _p.reportsReturnPayment);
                            }
                            break;
                        case "reportsPayment":
                            if (updatedContracts.reports[reportIndex].reportsPayment.length > (((_s = (_r = (_q = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _q === void 0 ? void 0 : _q[reportIndex]) === null || _r === void 0 ? void 0 : _r.reportsPayment) === null || _s === void 0 ? void 0 : _s.length) || 0)) {
                                updatedContracts.reports[reportIndex].reportsPayment.forEach((updatedObj, reportPaymentIndex) => {
                                    var _a, _b, _c, _d, _e, _f, _g;
                                    if (reportPaymentIndex < (((_c = (_b = (_a = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _a === void 0 ? void 0 : _a[reportIndex]) === null || _b === void 0 ? void 0 : _b.reportsPayment) === null || _c === void 0 ? void 0 : _c.length) || 0)) {
                                        const currentObj = (_g = (_f = (_e = (_d = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _d === void 0 ? void 0 : _d[reportIndex]) === null || _e === void 0 ? void 0 : _e.reportsPayment) === null || _f === void 0 ? void 0 : _f[reportPaymentIndex]) === null || _g === void 0 ? void 0 : _g.dataValues;
                                        compareObjects(updatedObj, currentObj, reportIndex, reportPaymentIndex);
                                    }
                                    else {
                                        events.push(raise_event_1.Events.ReportPaymentCreated(reportIndex, reportPaymentIndex));
                                    }
                                });
                            }
                            if (updatedContracts.reports[reportIndex].reportsPayment.length < (((_v = (_u = (_t = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _t === void 0 ? void 0 : _t[reportIndex]) === null || _u === void 0 ? void 0 : _u.reportsPayment) === null || _v === void 0 ? void 0 : _v.length) || 0)) {
                                (_x = (_w = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _w === void 0 ? void 0 : _w[reportIndex]) === null || _x === void 0 ? void 0 : _x.reportsPayment.forEach((currentObj, reportPaymentIndex) => {
                                    if (reportPaymentIndex < updatedContracts.reports[reportIndex].reportsPayment.length) {
                                        const updatedObj = updatedContracts.reports[reportIndex].reportsPayment[reportPaymentIndex];
                                        compareObjects(updatedObj, currentObj, reportIndex, reportPaymentIndex);
                                    }
                                    else {
                                        events.push(raise_event_1.Events.ReportPaymentDeleted(reportIndex, reportPaymentIndex));
                                    }
                                });
                            }
                            if (updatedContracts.reports[reportIndex].reportsPayment.length === (((_0 = (_z = (_y = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _y === void 0 ? void 0 : _y[reportIndex]) === null || _z === void 0 ? void 0 : _z.reportsPayment) === null || _0 === void 0 ? void 0 : _0.length) || 0)) {
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
                                ComparePaymentsObjects((_1 = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _1 === void 0 ? void 0 : _1[reportIndex].reportsPayment, updatedContracts.reports[reportIndex].reportsPayment);
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
    const compareReturnObjects = (updatedObj, currentObj, reportIndex, reportReturnPaymentIndex) => {
        for (const key in updatedObj) {
            if (key !== "id" && key !== "contractId" && key !== "reportId") {
                if (key === "dateReturnPayment") {
                    if (new Date(updatedObj[key]).getTime() !== new Date((currentObj === null || currentObj === void 0 ? void 0 : currentObj[key]) || 0).getTime()) {
                        events.push(raise_event_1.Events.ReportReturnPaymentUpdated(reportIndex, reportReturnPaymentIndex, "dateReturnPayment"));
                    }
                }
                else if (updatedObj[key] !== (currentObj === null || currentObj === void 0 ? void 0 : currentObj[key])) {
                    events.push(raise_event_1.Events.ReportReturnPaymentUpdated(reportIndex, reportReturnPaymentIndex, key));
                }
            }
        }
    };
    const events = [];
    if (updatedContracts.customer !== ((existedContract === null || existedContract === void 0 ? void 0 : existedContract.dataValues.customer) || 0)) {
        events.push(raise_event_1.Events.ContractCustomerUpdated);
    }
    if (new Date(updatedContracts.dateContract).getTime() !== (((_b = (_a = existedContract === null || existedContract === void 0 ? void 0 : existedContract.dataValues) === null || _a === void 0 ? void 0 : _a.dateContract) === null || _b === void 0 ? void 0 : _b.getTime()) || 0)) {
        events.push(raise_event_1.Events.ContractDateContractUpdated);
    }
    if (updatedContracts.numContract !== ((existedContract === null || existedContract === void 0 ? void 0 : existedContract.dataValues.numContract) || 0)) {
        events.push(raise_event_1.Events.ContractNumContractUpdated);
    }
    if (updatedContracts.typeContract !== ((existedContract === null || existedContract === void 0 ? void 0 : existedContract.dataValues.typeContract) || 0)) {
        events.push(raise_event_1.Events.ContractTypeContractUpdated);
    }
    if (((_c = updatedContracts.reports) === null || _c === void 0 ? void 0 : _c.length) > (((_d = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _d === void 0 ? void 0 : _d.length) || 0)) {
        updatedContracts.reports.forEach((updatedReport, reportIndex) => {
            var _a, _b, _c;
            const currentReport = (_b = (_a = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _a === void 0 ? void 0 : _a[reportIndex]) === null || _b === void 0 ? void 0 : _b.dataValues;
            if (reportIndex < (((_c = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _c === void 0 ? void 0 : _c.length) || 0)) {
                compareReportsObjects(updatedReport, currentReport, reportIndex);
            }
            else {
                events.push(raise_event_1.Events.ReportCreated);
            }
        });
    }
    if (updatedContracts.reports.length < (((_e = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _e === void 0 ? void 0 : _e.length) || 0)) {
        events.push(raise_event_1.Events.ReportDeleted);
    }
    if (updatedContracts.reports.length === (((_f = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _f === void 0 ? void 0 : _f.length) || 0)) {
        updatedContracts.reports.forEach((_, reportIndex) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
            if (updatedContracts.reports[reportIndex].totalCost !== (((_b = (_a = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _a === void 0 ? void 0 : _a[reportIndex]) === null || _b === void 0 ? void 0 : _b.totalCost) || 0)) {
                events.push(raise_event_1.Events.ReportTotalCost(reportIndex));
            }
            if (updatedContracts.reports[reportIndex].reportDescription !== (((_d = (_c = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _c === void 0 ? void 0 : _c[reportIndex]) === null || _d === void 0 ? void 0 : _d.reportDescription) || 0)) {
                events.push(raise_event_1.Events.ReportReportDescription(reportIndex));
            }
            if (updatedContracts.reports[reportIndex].presenter !== (((_f = (_e = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _e === void 0 ? void 0 : _e[reportIndex]) === null || _f === void 0 ? void 0 : _f.presenter) || 0)) {
                events.push(raise_event_1.Events.ReportPresenter(reportIndex));
            }
            if (updatedContracts.reports[reportIndex].reportsPayment.length > (((_j = (_h = (_g = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _g === void 0 ? void 0 : _g[reportIndex]) === null || _h === void 0 ? void 0 : _h.reportsPayment) === null || _j === void 0 ? void 0 : _j.length) || 0)) {
                updatedContracts.reports[reportIndex].reportsPayment.forEach((updatedObj, reportPaymentIndex) => {
                    var _a, _b, _c, _d, _e, _f, _g;
                    if (reportPaymentIndex < (((_c = (_b = (_a = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _a === void 0 ? void 0 : _a[reportIndex]) === null || _b === void 0 ? void 0 : _b.reportsPayment) === null || _c === void 0 ? void 0 : _c.length) || 0)) {
                        const currentObj = (_g = (_f = (_e = (_d = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _d === void 0 ? void 0 : _d[reportIndex]) === null || _e === void 0 ? void 0 : _e.reportsPayment) === null || _f === void 0 ? void 0 : _f[reportPaymentIndex]) === null || _g === void 0 ? void 0 : _g.dataValues;
                        compareObjects(updatedObj, currentObj, reportIndex, reportPaymentIndex);
                    }
                    else {
                        events.push(raise_event_1.Events.ReportPaymentCreated(reportIndex, reportPaymentIndex));
                    }
                });
            }
            if (updatedContracts.reports[reportIndex].reportsReturnPayment.length > (((_m = (_l = (_k = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _k === void 0 ? void 0 : _k[reportIndex]) === null || _l === void 0 ? void 0 : _l.reportsReturnPayment) === null || _m === void 0 ? void 0 : _m.length) || 0)) {
                updatedContracts.reports[reportIndex].reportsReturnPayment.forEach((updatedObj, reportsReturnPaymentIndex) => {
                    var _a, _b, _c, _d, _e, _f, _g;
                    if (reportsReturnPaymentIndex < (((_c = (_b = (_a = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _a === void 0 ? void 0 : _a[reportIndex]) === null || _b === void 0 ? void 0 : _b.reportsReturnPayment) === null || _c === void 0 ? void 0 : _c.length) || 0)) {
                        const currentObj = (_g = (_f = (_e = (_d = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _d === void 0 ? void 0 : _d[reportIndex]) === null || _e === void 0 ? void 0 : _e.reportsReturnPayment) === null || _f === void 0 ? void 0 : _f[reportsReturnPaymentIndex]) === null || _g === void 0 ? void 0 : _g.dataValues;
                        compareReturnObjects(updatedObj, currentObj, reportIndex, reportsReturnPaymentIndex);
                    }
                    else {
                        events.push(raise_event_1.Events.ReportReturnPaymentCreated(reportIndex, reportsReturnPaymentIndex));
                    }
                });
            }
            if (updatedContracts.reports[reportIndex].reportsPayment.length < (((_q = (_p = (_o = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _o === void 0 ? void 0 : _o[reportIndex]) === null || _p === void 0 ? void 0 : _p.reportsPayment) === null || _q === void 0 ? void 0 : _q.length) || 0)) {
                (_s = (_r = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _r === void 0 ? void 0 : _r[reportIndex]) === null || _s === void 0 ? void 0 : _s.reportsPayment.forEach((currentObj, reportPaymentIndex) => {
                    if (reportPaymentIndex < updatedContracts.reports[reportIndex].reportsPayment.length) {
                        const updatedObj = updatedContracts.reports[reportIndex].reportsPayment[reportPaymentIndex];
                        compareObjects(updatedObj, currentObj, reportIndex, reportPaymentIndex);
                    }
                    else {
                        events.push(raise_event_1.Events.ReportPaymentDeleted(reportIndex, reportPaymentIndex));
                    }
                });
            }
            if (updatedContracts.reports[reportIndex].reportsReturnPayment.length < (((_v = (_u = (_t = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _t === void 0 ? void 0 : _t[reportIndex]) === null || _u === void 0 ? void 0 : _u.reportsReturnPayment) === null || _v === void 0 ? void 0 : _v.length) || 0)) {
                (_x = (_w = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _w === void 0 ? void 0 : _w[reportIndex]) === null || _x === void 0 ? void 0 : _x.reportsReturnPayment.forEach((currentObj, reportReturnPaymentIndex) => {
                    if (reportReturnPaymentIndex < updatedContracts.reports[reportIndex].reportsReturnPayment.length) {
                        const updatedObj = updatedContracts.reports[reportIndex].reportsReturnPayment[reportReturnPaymentIndex];
                        compareReturnObjects(updatedObj, currentObj, reportIndex, reportReturnPaymentIndex);
                    }
                    else {
                        events.push(raise_event_1.Events.ReportReturnPaymentDeleted(reportIndex, reportReturnPaymentIndex));
                    }
                });
            }
            if (updatedContracts.reports[reportIndex].reportsPayment.length === (((_0 = (_z = (_y = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _y === void 0 ? void 0 : _y[reportIndex]) === null || _z === void 0 ? void 0 : _z.reportsPayment) === null || _0 === void 0 ? void 0 : _0.length) || 0)) {
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
                ComparePaymentsObjects((_1 = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _1 === void 0 ? void 0 : _1[reportIndex].reportsPayment, updatedContracts.reports[reportIndex].reportsPayment);
            }
            if (updatedContracts.reports[reportIndex].reportsReturnPayment.length === (((_4 = (_3 = (_2 = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _2 === void 0 ? void 0 : _2[reportIndex]) === null || _3 === void 0 ? void 0 : _3.reportsReturnPayment) === null || _4 === void 0 ? void 0 : _4.length) || 0)) {
                const CompareReturnPaymentsObjects = (currentArray, updatedArray) => {
                    updatedArray.forEach((_, reportReturnPaymentIndex) => {
                        var _a;
                        const updatedObj = updatedArray === null || updatedArray === void 0 ? void 0 : updatedArray[reportReturnPaymentIndex];
                        const currentObj = (_a = currentArray === null || currentArray === void 0 ? void 0 : currentArray[reportReturnPaymentIndex]) === null || _a === void 0 ? void 0 : _a.dataValues;
                        for (const key in updatedObj) {
                            if (key !== "id" && key !== "contractId" && key !== "reportId") {
                                if (key === "dateReturnPayment") {
                                    if (new Date(updatedObj[key]).getTime() !== new Date((currentObj === null || currentObj === void 0 ? void 0 : currentObj[key]) || 0).getTime()) {
                                        events.push(raise_event_1.Events.ReportReturnPaymentUpdated(reportIndex, reportReturnPaymentIndex, "dateReturnPayment"));
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
                CompareReturnPaymentsObjects((_6 = (_5 = existedContract === null || existedContract === void 0 ? void 0 : existedContract.reports) === null || _5 === void 0 ? void 0 : _5[reportIndex]) === null || _6 === void 0 ? void 0 : _6.reportsReturnPayment, (_7 = updatedContracts.reports[reportIndex]) === null || _7 === void 0 ? void 0 : _7.reportsReturnPayment);
            }
        });
    }
    return events;
};
exports.updatedEventStory = updatedEventStory;
