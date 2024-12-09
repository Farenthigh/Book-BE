import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { bookType } from "../enum/book";
import { FavoriteBook } from "./favbook";
import { Rentbook } from "./rentbook";
import { Salebook } from "./salebook";
import { Author } from "./author"
import { Publisher } from "./publisher";

@Entity()
export class book {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  type: bookType;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  author_id: string;

  @Column({ nullable: false })
  publisher_id: string;

  @Column({ nullable: false })
  category_id: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @OneToOne(() => Salebook, (Salebook) => Salebook.id, {
    onDelete: "CASCADE",
  })
  salebook: Salebook;

  @OneToOne(() => Rentbook, (Rentbook) => Rentbook.id, {
    onDelete: "CASCADE",
  })
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
