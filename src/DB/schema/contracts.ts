import { Table, Column, Model, HasMany } from "sequelize-typescript";
import ReportsModel, { IReportsModel } from "./reports";
import { IReportDto } from "../../dto/IContractDto";
import CustomersModel, { ICustomersModel } from "./customers";
export interface IContractsModel {
  id?: number;
  numContract: string;
  dateContract: string;
  typeContract: string;
  customer: string;
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
  public typeContract!: string;
  @Column
  public customer!: string;

  @HasMany(() => ReportsModel)
  public reports!: ReportsModel[];
  // @HasMany(() => CustomersModel)
  // public customers!: CustomersModel[];
}
