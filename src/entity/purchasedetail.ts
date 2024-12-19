import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PurchaseTrans } from "./purchasetrans";
import { Salebook } from "./salebook";

@Entity()
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
