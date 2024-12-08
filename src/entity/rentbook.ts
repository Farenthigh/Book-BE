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
import { Fine } from "./fine";
import { Rent } from "./rent";
import { RentalDetail } from "./rentaldetail";
import { User } from "./User";

@Entity()
export class Rentbook {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => User, (User) => User.id, { onUpdate: "CASCADE" })
  owner: User;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  stock_quantity: number;

  @Column({ default: "available" })
  status: statustype;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @OneToOne(() => book, (book) => book.id, { onUpdate: "CASCADE" })
  book: book;

  @OneToMany(() => RentalDetail, (RentalDetail) => RentalDetail.RentbookId, {
    onDelete: "CASCADE",
  })
  rentaldetail: RentalDetail[];

  @OneToOne(() => Fine, (Fine) => Fine.id, { onDelete: "CASCADE" })
  fine: Fine;

  @OneToMany(() => Rent, (Rent) => Rent.rentbook, { onDelete: "CASCADE" })
  rent: Rent[];
}
