import { IReportsReturnPayment } from "../DB/schema/reportsReturnPayment";

export interface IContractDto {
  numContract: string;
  dateContract: string;
  customer: string;
  typeContract: string;
  reports: IReportDto[];
}
export interface IUpdateContractDto {
  id: number;
  numContract: string;
  dateContract: string;
  customers: string[];
  typeContract: string;
  reports: IReportDto[];
}
export interface IReportDto {
  reportDescription: string;
  totalCost: string;
  presenter: string;
  reportsPayment: IReportPaymentDto[];
  reportsReturnPayment: IReportsReturnPaymentDto[];
}

export interface IReportPaymentDto {
  bank: string;
  payments: string;
  datepayment: string;
  paymentDescription: string;
}

export interface IReportsReturnPaymentDto {
  returnPaymentsbank: string;
  returnPayments: string;
  dateReturnPayment: string;
  returnPaymentDescription: string;
}
