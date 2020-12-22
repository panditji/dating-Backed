import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Double } from "typeorm";
import { User } from "./User";

export enum planType {
    SUBSCRIPTION = "subscription",
    FEATURE = "feature",
    WHITELABEL = "whitelabel",
    DOMAIN = "domain",
}

@Entity({name: "subscriptionplans"})
export class SubscriptionPlan {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column({
        type: "enum",
        enum: planType,
        default: planType.DOMAIN
    })
    type: planType;

    @Column('integer', {nullable: true})
    numberofEvents: number;

    @Column({nullable: true})
    text: string

    @Column('double')
    fees: number

    @Column('double')
    price: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'createdBy' })
    createdBy: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'updatedBy' })
    updatedBy: User;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}
