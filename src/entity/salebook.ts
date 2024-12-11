import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { statustype } from "../enum/status";
import { book } from "./book";
import { Buy } from "./buy";
import { condition } from "./condition";
import { PurchaseDetail } from "./purchasedetail";
import { User } from "./User";

@Entity()
export class Salebook {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false, default: 1 })
  stock_quantity: string;

  @Column({ default: "available" })
  status: statustype;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @OneToOne(() => book, (book) => book.id, {
    onUpdate: "CASCADE",
  })
  book: book;

  @ManyToOne(() => condition, (condition) => condition.id, {
    onUpdate: "CASCADE",
  })
  condition: condition;

  @ManyToOne(() => User, (User) => User.id, { onUpdate: "CASCADE" })
  seller: User;

  @ManyToOne(() => PurchaseDetail, (PurchaseDetail) => PurchaseDetail.id, {
    onDelete: "CASCADE",
  })
  purchasedetail: PurchaseDetail;

  @OneToMany(() => Buy, (Buy) => Buy.salebook, { onDelete: "CASCADE" })
  buy: Buy[];
}
