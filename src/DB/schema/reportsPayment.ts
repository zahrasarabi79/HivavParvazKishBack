import { Table, Column, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import ContractsModel, { IContractsModel } from "./contracts";
import ReportsModel, { IReportsModel } from "./reports";

export interface IReportsPayment {
  bank: string;
  payments: string;
  datepayment: string;
  paymentDescription: string;
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
  @Column
  public paymentDescription!: string;

  @ForeignKey(() => ReportsModel)
  @Column
  reportId!: number;

  @ForeignKey(() => ContractsModel)
  @Column
  contractId!: number;

  @BelongsTo(() => ReportsModel)
  reports!: ReportsModel;
}
