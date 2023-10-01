import { IReportsReturnPayment } from "../DB/schema/reportsReturnPayment";

export interface IContractDto {
  numContract: string;
  dateContract: Date;
  customer: string;
  typeContract: string;
  reports: IReportDto[];
}
export interface IUpdateContractDto {
  id: number;
  numContract: string;
  dateContract: Date;
  customer: string;
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
  datepayment: Date;
  paymentDescription: string;
}

export interface IReportsReturnPaymentDto {
  returnPaymentsbank: string;
  returnPayments: string;
  dateReturnPayment: Date;
  returnPaymentDescription: string;
}
