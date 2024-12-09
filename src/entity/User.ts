import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  ManyToOne,
} from "typeorm";
import { Cookie } from "./cookie";
import { Salebook } from "./salebook";
import { Rentbook } from "./rentbook";
import { PurchaseTrans } from "./purchasetrans";
import { RentalTransaction } from "./rentaltransaction";
import { Rent } from "./rent";
import { Buy } from "./buy";
import { FavoriteBook } from "./favbook";
import { PhoneNumber } from "./phonenumber";
import { Address } from "./address";
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

  @Column()
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
