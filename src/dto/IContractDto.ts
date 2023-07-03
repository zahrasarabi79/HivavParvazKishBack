export interface IReportDto {
  number: number;
  costTitle: string;
  presenter: string;
  bank: string;
  payments: string;
  datepayment: string;
}

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
