import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from "typeorm";

export enum messagePriority {
    HIGH = "high",
    LOW = "low",
    MEDIUM = "medium"
}

@Entity({name: "queueemails"})
export class QueueEmail {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: messagePriority,
        default: messagePriority.LOW
    })
    messagePriority: string

    @Column({nullable: true})
    from: string;

    @Column({nullable: true})
    fromName: string;

    @Column()
    to: string;

    @Column()
    toName: string;

    @Column({nullable: true})
    cc: string;

    @Column({nullable: true})
    bb: string;

    @Column()
    body: string;

    @Column('tinyint', {nullable: true})
    sendImmediately: number;

    @Column('int',{nullable: true})
    sentAttempts: number;

    @Column('tinyint',{nullable: true})
    sendOn: number;

}
