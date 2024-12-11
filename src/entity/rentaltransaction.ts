import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { shipmentType } from "../enum/shipment";
import { rentStatus } from "./../enum/rentstatus";
import { User } from "./User";

@Entity()
export class RentalTransaction {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => User, (User) => User.id, {
    onUpdate: "CASCADE",
  })
  renter: User;

  @Column({ nullable: false })
  rent_date: Date;

  @Column({ nullable: false })
  return_due_date: Date;

  @Column({ default: "active" })
  rentStatus: rentStatus;

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
