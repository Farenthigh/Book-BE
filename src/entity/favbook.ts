import { ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { book } from "./book";

export class FavoriteBook {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (User) => User.id, {
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => book, (book) => book.id, {
    onDelete: "CASCADE",
  })
  book: book;
}
