import { ManyToOne, OneToMany } from "typeorm";
import { Salebook } from "./salebook";
import { User } from "./User";

export class Buy {
  @OneToMany(() => User, (User) => User.id, {
    onDelete: "CASCADE",
  })
  user: User[];

  @ManyToOne(() => Salebook, (Salebook) => Salebook.id, {
    onDelete: "CASCADE",
  })
  salebook: Salebook;
}
