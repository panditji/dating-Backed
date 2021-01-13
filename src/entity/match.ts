import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, OneToOne, UpdateDateColumn, BeforeInsert, BeforeUpdate, Column, Timestamp } from "typeorm";
import { Roles } from './Roles';
import { IdealFirstDate } from './IdealFirstDate';
import { ExpensiveFirstDateMaster } from './ExpensiveFirstDateMaster';
import { Address } from './address';
import { UserToMatch } from './userToMatch';
import { User } from './User';



@Entity({ name: "match" })
export class Match {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    userId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ nullable: true })
    interestedGender: number;

    @Column({ nullable: true })
    wantChildren: number;

    @Column({ nullable: true })
    educationLevel: number;

    @Column({ nullable: true })
    smoke: number;

    @Column({ nullable: true })
    drink: number;

    @Column({ nullable: true })
    myersBriggs: number;


    @Column({ nullable: true })
    idealFirstDateId: number;


    @Column({ nullable: true })
    expensiveFirstDateId: number;

    @Column({ nullable: true })
    isActive: Boolean;

}