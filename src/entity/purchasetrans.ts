import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { shipmentType } from "../enum/shipment";
import { User } from "./User";

export class PurchaseTrans {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => User, (User) => User.id, { onUpdate: "CASCADE" })
  buyer: User;

  @Column({ nullable: false })
  purchaseDate: Date;

  @Column({ default: "pending" })
  shipmentStatus: shipmentType;

  @Column()
  shipmentDate: Date;

  @Column()
  deliveredDate: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
