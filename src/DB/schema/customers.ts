import { Table, Column, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import ContractsModel, { IContractsModel } from "./contracts";

export interface ICustomersModel {
  customer: string;
  contractId: number;
}
@Table({
  timestamps: false,
})
export default class CustomersModel extends Model<ICustomersModel> {
  @Column
  public customer!: string;

  @ForeignKey(() => ContractsModel)
  @Column
  public contractId!: number;

  @BelongsTo(() => ContractsModel)
  public contract!: IContractsModel;
}
