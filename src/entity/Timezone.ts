import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity({name: "timezones"})
export class Timezone {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    countryCode: string

    @Column({nullable: true})
    latitude: string;

    @Column({nullable: true})
    logitude: string;

    @Column()
    utcOffset: string;

    @Column()
    text: string;

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
