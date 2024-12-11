import { OneToOne, PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { Rentbook } from "./rentbook";
import { fineType } from "../enum/fine";
@Entity()
export class Fine {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @OneToOne(() => Rentbook, (Rentbook) => Rentbook.id, {
    onDelete: "CASCADE",
  })
  rentbook: Rentbook;

  @Column({ nullable: false })
  fineamount: number;

  @Column()
  fineDueDate: Date;

  @Column()
  paidDate: Date;

  @Column()
  status: fineType;

  @Column({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  lastupdate: Date;
}
