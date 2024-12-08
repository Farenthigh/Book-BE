import { on } from "events";
import { ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { Rentbook } from "./rentbook";

export class Rent {
  @OneToMany(() => User, (User) => User.id, {
    onDelete: "CASCADE",
  })
  user: User[];

  @ManyToOne(() => Rentbook, (Rentbook) => Rentbook.id, {
    onDelete: "CASCADE",
  })
  rentbook: Rentbook;
}
