import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import ContractsModel, { IContractsModel } from "./contracts";

// export interface IReports {
//   report: IReport[];
// }
export interface IReportsModel {
  number: number;
  costTitle: string;
  presenter: string;
  bank: string;
  payments: string;
  datepayment: string;
  contractId: number;
}
//@table : در این جا دکورتور فانکشن که پرانتزش توی تی اس کانفیگ برداشته شده
@Table({
  timestamps: false,
})
export default class ReportsModel extends Model<IReportsModel> {
  //   public report!: IReport[];
  @Column
  public number!: number; //علامت سوال به معنی پر کردن اجباری این ستون است
  @Column
  public costTitle!: string;
  @Column
  public presenter!: string;
  @Column
  public bank!: string;
  @Column
  public payments!: string;
  @Column
  public datepayment!: string;

  @ForeignKey(() => ContractsModel)
  @Column
  contractId!: number;
  @BelongsTo(() => ContractsModel)
  contract!: ContractsModel;
}
