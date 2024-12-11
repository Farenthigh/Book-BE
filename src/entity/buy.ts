import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Salebook } from "./salebook";
import { User } from "./User";

@Entity()
export class Buy {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @OneToMany(() => User, (User) => User.id, {
    onDelete: "CASCADE",
  })
  user: User[];

  @ManyToOne(() => Salebook, (Salebook) => Salebook.id, {
    onDelete: "CASCADE",
  })
  salebook: Salebook;
}
