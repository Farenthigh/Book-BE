import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Rentbook } from "./rentbook";

@Entity()
export class Rent {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @OneToMany(() => User, (User) => User.id, {
    onDelete: "CASCADE",
  })
  user: User[];

  @ManyToOne(() => Rentbook, (Rentbook) => Rentbook.id, {
    onDelete: "CASCADE",
  })
  rentbook: Rentbook;
}
