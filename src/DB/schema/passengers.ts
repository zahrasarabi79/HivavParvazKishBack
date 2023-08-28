import { Table, Column, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import ContractsModel, { IContractsModel } from "./contracts";

export interface IPassengersModel {
  passenger: string;
  contractId: number;
}
@Table({
  timestamps: false,
})
export default class PassengersModel extends Model<IPassengersModel> {
  @Column
  public passenger!: string;

  @ForeignKey(() => ContractsModel)
  @Column
  public contractId!: number;

  @BelongsTo(() => ContractsModel)
  public contract!: IContractsModel;
}
