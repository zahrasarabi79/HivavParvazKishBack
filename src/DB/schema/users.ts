import { Table, Column, Model } from "sequelize-typescript";

export interface IUserModel {
  id?: number;
  username: string;
  password: string;
  name: string;
  role: string;
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

  @Column
  public name!: string;

  @Column
  public role!: string;
}
