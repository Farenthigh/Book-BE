import { Column, Entity, ManyToOne, Check, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User"


@Entity()
export class PhoneNumber {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => User, (User) => User.id, {
        onUpdate: "CASCADE",
    })
    user: User;

    @Column({ nullable: false })
    phone_number: string;

    @Check('phone_number REGEXP "^[0-9]{10}$"')
    phoneNumberCheck: string;

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;

}