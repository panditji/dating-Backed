import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, Column, Timestamp, Double } from "typeorm";
import { User } from './User';
import { Status } from './Status';
export enum type {
    MONTHLY = "Monthly",
    QUARTERLY = "Quarterly",
    YEARLY = "Yearly",
    FREE = "Free"
}
export enum status {
    ACTIVE = "active",
    INACTIVE = "inactive",
    DELETED = "deleted"
}

@Entity()
export class SubscriptionPlans {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: string;

    @Column({
        type: "enum",
        enum: type
    })
    type: type

    @Column({ nullable: true })
    text: string;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, nullable: true })
    price: Double;

    @Column({ nullable: true })
    numberOfLove: number;

    @Column({ nullable: true })
    numberOfFiling: number;

    @Column()
    createdBy: number;

    @Column()
    updatedBy: number;


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
