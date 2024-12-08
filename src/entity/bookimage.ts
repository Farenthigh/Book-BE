import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { book } from "./book";

export class BookImage {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => book, (book) => book.id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  book: book;

  @Column({ nullable: false })
  image: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
