import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from "typeorm";

export enum status {
    ACTIVE = "active",
    INACTIVE = "inactive",
    DELETED = "deleted"
}

@Entity({name: "users"})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({nullable: true})
    userProfilePicture: string;

    @Column()
    email: string;

    @Column("bigint", {nullable: true})
    phoneNumber: number;

    @Column()
    password: string;

    @Column({nullable: true})
    otpCode: number;

    @Column("timestamp", {nullable: true})
    otpCodeExpireTime: Timestamp;

    @Column({
        type: "enum",
        enum: status,
        default: status.INACTIVE
    })
    status: status

}
