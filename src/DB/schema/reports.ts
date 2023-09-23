import { Table, Column, Model, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import ContractsModel, { IContractsModel } from "./contracts";
import ReportsPaymentModel, { IReportsPayment } from "./reportsPayment";
import reportsReturnPaymentModel, { IReportsReturnPayment } from "./reportsReturnPayment";
import ReportsReturnPaymentModel from "./reportsReturnPayment";

// export interface IReports {
//   report: IReport[];
// }
export interface IReportsModel {
  reportDescription: string;
  totalCost: string;
  presenter: string;
  reportsPayment: IReportsPayment[];
  reportsReturnPayment: IReportsReturnPayment[];
  contractId: number;
}
@Table({
  timestamps: false,
})
export default class ReportsModel extends Model<IReportsModel> {
  @Column
  public reportDescription!: string;
  @Column
  public totalCost!: string;
  @Column
  public presenter!: string;

  @HasMany(() => ReportsPaymentModel)
  public reportsPayment!: ReportsPaymentModel[];

  @HasMany(() => ReportsReturnPaymentModel)
  public reportsReturnPayment!: ReportsReturnPaymentModel[];

  @ForeignKey(() => ContractsModel)
  @Column
  contractId!: number;

  @BelongsTo(() => ContractsModel)
  contract!: ContractsModel;
}
