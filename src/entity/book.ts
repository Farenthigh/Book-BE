import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { postType } from "../enum/book";
import { Author } from "./author";
import { FavoriteBook } from "./favbook";
import { Publisher } from "./publisher";
import { Rentbook } from "./rentbook";
import { Salebook } from "./salebook";

@Entity()
export class book {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  type: postType;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column()
  category: string;

  @Column()
  phoneNumber: string;

  @Column()
  lineID: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @OneToOne(() => Salebook, (Salebook) => Salebook.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  salebook: Salebook;

  @OneToOne(() => Rentbook, (Rentbook) => Rentbook.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  rentbook: Rentbook;

  @OneToMany(() => FavoriteBook, (FavoriteBook) => FavoriteBook.book, {
    onDelete: "CASCADE",
  })
  favbook: FavoriteBook[];

  @ManyToOne(() => Author, (Author) => Author.id, {
    onUpdate: "CASCADE",
  })
  author: Author;

  @ManyToOne(() => Publisher, (Publisher) => Publisher.id, {
    onUpdate: "CASCADE",
  })
  publisher: Publisher;
}
