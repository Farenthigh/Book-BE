import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Cookie {
  @PrimaryColumn()
  id: string;

  @Column()
  createdAt: Date;

  @Column()
  expiredAt: Date;

  @ManyToOne(() => User, (User) => User.id, {
    onDelete: "CASCADE",
  })
  user: User;
}
