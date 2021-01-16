import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, Column, Timestamp } from "typeorm";
import { User } from './User';
export enum type {
    MATCHED_YOU = "Matched You",
    YOUR_MATCHES = "Your Matches"
}
export enum status {
    REJECT = "Reject",
    LOVE = "Love",
    FEELING = "Feeling",
    NOTHING = "Nothing",
}

@Entity()
export class Match {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    userId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ nullable: true })
    matchUserId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'matchUserId' })
    matchUser: User;


    @Column({
        type: "enum",
        enum: type
    })
    type: type

    @Column({ type: 'tinytext', nullable: true })
    removeFromChat: string;

    @Column({
        type: "enum",
        enum: status
    })
    status: status

    @CreateDateColumn({ nullable: false, type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ nullable: false, select: false, type: 'timestamp' })
    updatedAt: Date;
}
