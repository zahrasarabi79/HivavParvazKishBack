import { Table, Column, Model } from "sequelize-typescript";
import ContractsModel from "./contracts";

export interface IEvent {
  id?: number;
  eventName: string;
  userId: number;
  contractId: number;
}

@Table({
  tableName: "events",
  // timestamps: true,
})
export default class Event extends Model<IEvent> {
  @Column
  public eventName!: string;

  @Column
  public userId!: number;

  @Column
  public contractId!: number;
}