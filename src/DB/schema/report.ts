import { Table, Column, Model, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import ContractsModel, { IContractsModel } from "./contracts";
import ReportsPaymentModel, { IReportsPayment } from "./reportPayment";

// export interface IReports {
//   report: IReport[];
// }
export interface IReportsModel {
  number: number;
  costTitle: string;
  presenter: string;
  reportPayment: IReportsPayment[];
  contractId: number;
}
@Table({
  timestamps: false,
})
export default class ReportsModel extends Model<IReportsModel> {
  @Column
  public number!: number;
  @Column
  public costTitle!: string;
  @Column
  public presenter!: string;

  @HasMany(() => ReportsPaymentModel)
  public reportPayment!: ReportsPaymentModel[];

  @ForeignKey(() => ContractsModel)
  @Column
  contractId!: number;

  @BelongsTo(() => ContractsModel)
  contract!:ContractsModel;
}
