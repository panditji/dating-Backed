import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, Column, Timestamp, Double } from "typeorm";
import { User } from './User';
import { Status } from './Status';
import { SubscriptionPlans } from './SubscriptionPlans';

@Entity()
export class SubscriptionPurchased {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    userId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ nullable: true })
    subcriptionPlanId: number;

    @ManyToOne(() => SubscriptionPlans)
    @JoinColumn({ name: 'subcriptionPlanId' })
    subcriptionPlan: SubscriptionPlans;

    @Column({ nullable: true })
    transactionId: string;

    @Column({ nullable: true, type: 'timestamp' })
    startDate: Date;

    @Column({ nullable: true, type: 'timestamp' })
    endDate: Date;

    @Column({ nullable: true })
    statusId: number

    @ManyToOne(() => Status)
    @JoinColumn({ name: 'statusId' })
    status: Status;

    @Column()
    createdBy: number;

    @CreateDateColumn({ nullable: false, type: 'timestamp' })
    createdAt: Date;

}
