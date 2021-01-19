import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, OneToOne, UpdateDateColumn, BeforeInsert, BeforeUpdate, Column, Timestamp } from "typeorm";
import { Roles } from './Roles';
import { IdealFirstDate } from './IdealFirstDate';
import { ExpensiveFirstDateMaster } from './ExpensiveFirstDateMaster';
import { Address } from './address';
import { User } from './User';
import { Status } from './Status';

export enum type {
    HOTEL = "Hotel"
}

@Entity({ name: "venues" })
export class Venues {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, })
    addressId: number;

    //cascade
    @ManyToOne(() => Address)
    @JoinColumn({ name: 'addressId' })
    address: Address;

    @Column({ nullable: true })
    userId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true, type: "json" })
    images: string;

    @Column({ nullable: false })
    aboutVenue: string;

    @Column("bigint", { nullable: true })
    abn: number;

    @Column({
        type: "enum",
        enum: type
    })
    type: type;

    @Column({ nullable: true })
    statusId: number

    // @ManyToOne(() => Status)
    // @JoinColumn({ name: 'statusId' })
    // status: Status;

    @Column()
    createdBy: number;

    @Column()
    updatedBy: number;

    @CreateDateColumn({ nullable: false, type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ nullable: false, select: false, type: 'timestamp' })
    updatedAt: Date;


}
