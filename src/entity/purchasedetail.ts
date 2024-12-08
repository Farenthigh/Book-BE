import {
  Column,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Transaction,
} from "typeorm";
import { PurchaseTrans } from "./purchasetrans";
import { Salebook } from "./salebook";

export class PurchaseDetail {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @OneToOne(() => PurchaseTrans, (PurchaseTrans) => PurchaseTrans.id, {
    onUpdate: "CASCADE",
  })
  transaction: PurchaseTrans;

  @OneToMany(() => Salebook, (Salebook) => Salebook.id, { onUpdate: "CASCADE" })
  salebook: Salebook[];
}
