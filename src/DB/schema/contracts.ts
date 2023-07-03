import { Table, Column, Model, HasMany } from "sequelize-typescript";
import ReportsModel, { IReportsModel } from "./report";
import { IReportDto } from "../../dto/IContractDto";
import PassengersModel, { IPassengersModel } from "./passengers";
export interface IContractsModel {
  id?: number;
  numContract: string;
  dateContract: string;
  typeReport: string;
}
//@table : در این جا دکورتور فانکشن که پرانتزش توی تی اس کانفیگ برداشته شده
@Table({
  timestamps: false,
})
export default class ContractsModel extends Model<IContractsModel> {
  @Column
  public numContract!: string; //علامت سوال به معنی پر کردن اجباری این ستون است
  @Column
  public dateContract!: string;
  @Column
  public typeReport!: string;

  @HasMany(() => ReportsModel)
  public report!: ReportsModel[];
  @HasMany(() => PassengersModel)
  public passengers!: PassengersModel[];
}
