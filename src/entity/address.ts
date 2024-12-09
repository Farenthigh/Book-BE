import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User"


@Entity()
export class Address {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => User, (User) => User.id, {
        onUpdate: "CASCADE",
    })
    user: User;

    @Column({ nullable: false })
    address_line1: string;

    @Column()
    address_line2: string;

    @Column()
    subdistrict: string;

    @Column()
    district: string;

    @Column()
    province: string;

    @Column()
    postal_code: string;

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;
    
}