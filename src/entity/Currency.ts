import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

export enum status {
    ACTIVE = "active",
    INACTIVE = "inactive",
    DELETED = "deleted"
}

@Entity({name: "currencies"})
export class Currency {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column({nullable: true})
    symbol: string;

    @Column({nullable: true})
    abbreviation: string;

    @Column({
        type: "enum",
        enum: status,
        default: status.ACTIVE
    })
    status: status

    @Column({ nullable: true })
    flag: string;

    @Column('boolean', { default: false })
    isRoutingRequired: boolean;

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
