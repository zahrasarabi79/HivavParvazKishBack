import ReportsPaymentModel from "../DB/schema/reportsPayment";
import { IReportsReturnPayment } from "../DB/schema/reportsReturnPayment";

export interface IContractDto {
  numContract: string;
  dateContract: Date;
  customer: string;
  typeContract: string;
  reports: IReportDto[];
}
export interface IUserDto {
  name: string;
  username: string;
  password: string;
  role: string;
}
export interface IUserUpdate {
  name: string;
  username: string;
  password: string;
  role: string;
  id: number;
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
  [Key: string]: string | Date;
}

export interface IReportsReturnPaymentDto {
  returnPaymentsbank: string;
  returnPayments: string;
  dateReturnPayment: Date;
  returnPaymentDescription: string;
  [key: string]: string | Date;
}

export interface IUpdatePasswordDto {
  id: number;
  oldPassword: string;
  newPassword: string;
}

export interface ReportsPaymentModelObj extends ReportsPaymentModel {}
