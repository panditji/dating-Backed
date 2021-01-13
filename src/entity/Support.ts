import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, Column, Timestamp } from "typeorm";
import { User } from './User';
import { Status } from './Status'
export enum type {
    HELP = "help",
    SUPPORT = "support",
    TEST = "test"
}

@Entity()
export class Support {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    userId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;


    @Column({
        type: "enum",
        enum: type
    })
    type: type

    @Column({ nullable: true })
    message: string;

    @Column({ nullable: true, type: "json" })
    images: string;

    @Column({ nullable: true })
    statusId: number

    @ManyToOne(() => Status)
    @JoinColumn({ name: 'statusId' })
    status: Status;

    @CreateDateColumn({ nullable: false, type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ nullable: false, select: false, type: 'timestamp' })
    updatedAt: Date;
}
