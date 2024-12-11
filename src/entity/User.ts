import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./address";
import { Buy } from "./buy";
import { Cookie } from "./Cookie";
import { FavoriteBook } from "./favbook";
import { PhoneNumber } from "./phonenumber";
import { PurchaseTrans } from "./purchasetrans";
import { Rent } from "./rent";
import { RentalTransaction } from "./rentaltransaction";
import { Rentbook } from "./rentbook";
import { Salebook } from "./salebook";
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid", {
    name: "ID",
  })
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: "user" })
  role: string;

  @OneToMany(() => Cookie, (Cookie) => Cookie.id, {
    onDelete: "CASCADE",
  })
  cookies: Cookie[];

  @OneToMany(() => Salebook, (Salebook) => Salebook.id, {
    onDelete: "CASCADE",
  })
  salebooks: Salebook[];

  @OneToMany(() => Rentbook, (Rentbook) => Rentbook.id, {
    onDelete: "CASCADE",
  })
  rentbooks: Rentbook[];

  @OneToMany(() => PurchaseTrans, (PurchaseTrans) => PurchaseTrans.buyer, {
    onDelete: "CASCADE",
  })
  buyer: PurchaseTrans[];

  @OneToMany(
    () => RentalTransaction,
    (RentalTransaction) => RentalTransaction.renter,
    {
      onDelete: "CASCADE",
    }
  )
  renter: RentalTransaction[];

  @ManyToOne(() => Rent, (Rent) => Rent.user, {
    onDelete: "CASCADE",
  })
  rent: User;

  @ManyToOne(() => Buy, (Buy) => Buy.user, {
    onDelete: "CASCADE",
  })
  buy: User;

  @OneToMany(() => FavoriteBook, (FavoriteBook) => FavoriteBook.user, {
    onDelete: "CASCADE",
  })
  favbooks: FavoriteBook[];

  @OneToMany(() => PhoneNumber, (PhoneNumber) => PhoneNumber.id, {
    onUpdate: "CASCADE",
  })
  phonenumber: PhoneNumber[];

  @OneToMany(() => Address, (Address) => Address.id, {
    onUpdate: "CASCADE",
  })
  address: Address[];
}
