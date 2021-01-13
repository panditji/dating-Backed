import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, Column, Timestamp } from "typeorm";

export enum status {
    ACTIVE = "active",
    INACTIVE = "inactive",
    DELETED = "deleted",
    PROCESS = "In-Process"
}

@Entity()
export class Status {

    @PrimaryGeneratedColumn()
    id: number;

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
