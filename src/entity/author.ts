import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { book } from "./book"


@Entity()
export class Author {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @OneToMany(() => book, (book) => book.id, {
        onUpdate: "CASCADE",
    })
    book: book[];

}