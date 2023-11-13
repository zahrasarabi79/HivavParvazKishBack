import { Table, Column, Model, HasMany, BelongsToMany } from "sequelize-typescript";
import ReportsModel, { IReportsModel } from "./reports";
import { IReportDto } from "../../dto/IContractDto";
import AuthorModel from "./event";

export interface IContractsModel {
  id?: number;
  numContract: string;
  dateContract: Date;
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
  public dateContract!: Date;

  @Column
  public typeContract!: string;

  @Column
  public customer!: string;

  @HasMany(() => ReportsModel)
  public reports!: ReportsModel[];
}
