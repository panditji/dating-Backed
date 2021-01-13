import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, Column, Timestamp, ManyToOne } from "typeorm";
import { User } from "./User";

export enum type {
    HELP = "help",
    POLICE = "policies"
}

export enum status {
    ACTIVE = "active",
    INACTIVE = "inactive",
    DELETED = "deleted"
}

@Entity()
export class Help {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true, type: "json" })
    images: string;

    @Column({
        type: "enum",
        enum: type
    })
    type: type;

    @Column({
        type: "enum",
        enum: status
    })
    status: status;


    @CreateDateColumn({ nullable: false, type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ nullable: false, select: false, type: 'timestamp' })
    updatedAt: Date;



}
