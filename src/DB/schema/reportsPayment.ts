import { Table, Column, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import ContractsModel, { IContractsModel } from "./contracts";
import ReportsModel, { IReportsModel } from "./reports";

export interface IReportsPayment {
  bank: string;
  payments: string;
  datepayment: Date;
  paymentDescription: string;
  contractId: number;
  [Key: string]: number | Date | string;
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
  public datepayment!: Date;
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
