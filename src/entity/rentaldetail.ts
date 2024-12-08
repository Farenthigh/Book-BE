import { returnStatus } from "../enum/returnstatus";
import { Column, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RentalTransaction } from "./rentaltransaction";
import { Rentbook } from "./rentbook";
import { fineType } from "../enum/fine";

export class RentalDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(
    () => RentalTransaction,
    (RentalTransaction) => RentalTransaction.id,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  TransactionId: RentalTransaction;

  @ManyToOne(() => Rentbook, (Rentbook) => Rentbook.id, { onUpdate: "CASCADE" })
  RentbookId: Rentbook;

  @Column({ nullable: false })
  quantity: number;

  @Column()
  returnDate: Date;

  @Column({ default: 0 })
  returnquantity: number;

  @Column()
  returnStatus: returnStatus;

  @Column()
  fineamount: number;

  @Column()
  finestatus: fineType;

  @Column()
  paidDate: Date;
}
