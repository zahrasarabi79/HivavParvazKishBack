import { Table, Column, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import ContractsModel, { IContractsModel } from "./contracts";
import ReportsModel, { IReportsModel } from "./reports";

export interface IReportsReturnPayment {
  returnPaymentsbank: string;
  returnPayments: string;
  dateReturnPayment: Date;
  returnPaymentDescription: string;
  contractId: number;
  [key: string]: Date | string | number;
}
@Table({
  timestamps: false,
})
export default class ReportsReturnPaymentModel extends Model<IReportsReturnPayment> {
  @Column
  public returnPaymentsbank!: string;
  @Column
  public returnPayments!: string;
  @Column
  public dateReturnPayment!: Date;
  @Column
  public returnPaymentDescription!: string;

  @ForeignKey(() => ReportsModel)
  @Column
  reportId!: number;

  @ForeignKey(() => ContractsModel)
  @Column
  contractId!: number;

  @BelongsTo(() => ReportsModel)
  reports!: ReportsModel;
}
