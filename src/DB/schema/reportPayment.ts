import { Table, Column, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import ContractsModel, { IContractsModel } from "./contracts";
import ReportsModel, { IReportsModel } from "./report";

export interface IReportsPayment {
  bank: string;
  payments: string;
  datepayment: string;
  contractId: number;
}
@Table({
  timestamps: false,
})
export default class ReportsPaymentModel extends Model<IReportsPayment> {
  @Column
  public bank!: string;
  @Column
  public payments!: string;
  @Column
  public datepayment!: string;

  @ForeignKey(() => ReportsModel)
  @Column
  reportId!: number;

  @ForeignKey(() => ContractsModel)
  @Column
  contractId!: number;

  @BelongsTo(() => ReportsModel)
  report!: ReportsModel;

  
}
