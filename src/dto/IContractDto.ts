export interface IContractDto {
  numContract: string;
  dateContract: string;
  passengers: string[];
  typeReport: string;
  report: IReportDto[];
}
export interface IUpdateContractDto {
  id: number;
  numContract: string;
  dateContract: string;
  passengers: string[];
  typeReport: string;
  report: IReportDto[];
}
export interface IReportDto {
  number: number;
  costTitle: string;
  presenter: string;
  reportPayment: IReportPaymentDto[];
}

export interface IReportPaymentDto {
  bank: string;
  payments: string;
  datepayment: string;
}
