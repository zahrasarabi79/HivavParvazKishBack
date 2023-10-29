import { Table, Column, Model, HasMany } from "sequelize-typescript";
import Event from "./event";

export interface IUserModel {
  id?: number;
  username: string;
  password: string;
}

@Table({
  tableName: "users", // Set the table name to "users"
  timestamps: false,
})
export default class UserModel extends Model<IUserModel> {
  @Column
  public username!: string;

  @Column
  public password!: string;
}
