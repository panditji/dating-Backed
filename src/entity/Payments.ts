import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, Column, Timestamp, Double } from "typeorm";
import { User } from './User';

export enum paymentType {
    STRIPE = "stripe",
    paypal = "paypal",
    APPLE_PAY = "apple-pay",
    GOOGLE_PAY = "google-pay",
}
@Entity()
export class Payments {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    userId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ nullable: true })
    venueId: number;


    @Column({
        type: "enum",
        enum: paymentType
    })
    paymentType: paymentType

    @Column({ nullable: true })
    paymentApproved: boolean;

    @Column({ nullable: true })
    paymentDescription: string;

    @Column({ nullable: true })
    transactionId: string;

    @Column({ nullable: true })
    paidAmount: number

    @Column()
    createdBy: number;

    @CreateDateColumn({ nullable: false, type: 'timestamp' })
    createdAt: Date;

}
