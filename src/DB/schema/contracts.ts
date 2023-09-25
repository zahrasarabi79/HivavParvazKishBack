import { Table, Column, Model, HasMany } from "sequelize-typescript";
import ReportsModel, { IReportsModel } from "./reports";
import { IReportDto } from "../../dto/IContractDto";
export interface IContractsModel {
  id?: number;
  numContract: string;
  dateContract: string;
  typeContract: string;
  customer: string;
}
@Table({
  timestamps: false,
})
export default class ContractsModel extends Model<IContractsModel> {
  @Column
  public numContract!: string;

  @Column
  public dateContract!: string;

  @Column
  public typeContract!: string;
  
  @Column
  public customer!: string;

  @HasMany(() => ReportsModel)
  public reports!: ReportsModel[];
}
