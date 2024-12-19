import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { book } from "./book";

@Entity()
export class BookImage {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ nullable: false })
  image: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @ManyToOne(() => book, (book) => book.BookImage, {
    onUpdate: "CASCADE",
  })
  Book: book;
}
