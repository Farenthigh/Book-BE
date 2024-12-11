import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { conditionType } from "../enum/condition";
import { Salebook } from "./salebook";

@Entity()
export class condition {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ nullable: false })
  level: conditionType;

  @Column()
  description: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @OneToMany(() => Salebook, (Salebook) => Salebook.id, {
    onDelete: "CASCADE",
  })
  salebook: Salebook[];
}
