import { Table, Column, Model } from "sequelize-typescript";

export interface IUser {
  username: string;
  password: string;
}
//@table : در این جا دکورتور فانکشن که پرانتزش توی تی اس کانفیگ برداشته شده
@Table({
  timestamps: false,
})
export default class Users extends Model<IUser> {
  @Column
  public username!: string; //علامت سوال به معنی پر کردن اجباری این ستون است

  @Column
  public password!: string;
}
