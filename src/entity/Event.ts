import { Entity, PrimaryGeneratedColumn, Column, Timestamp, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

export enum status {
    SAVED = "saved",
    PUBLISHED = "published",
    UNPUBLISHED = "unpublished",
    DELETED = "deleted"
}

export enum background {
    PICTURE = "picture",
    COLOR = "color"
}

export enum pictureFit {
    CENTER = "center",
    COVER = "cover",
    REPEAT = "repeat"
}

@Entity({name: "events"})
export class Event {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    eventName: string;

    @Column()
    eventAbout: string;

    @Column('tinyint', {nullable: true})
    isPublic: number;

    @Column()
    currency: number;

    @Column()
    targetAmount: number;

    @Column('tinyint')
    isPremiumPlacement: number;

    @Column({nullable: true})
    tags: string;

    @Column('tinyint')
    location: number;

    @Column('tinyint', {nullable: true})
    venue: number;

    @Column('timestamp', {nullable: true})
    startDate: Timestamp;

    @Column('timestamp', {nullable: true})
    endDate: Timestamp;

    @Column({
        type: "enum",
        enum: status,
        default: status.SAVED
    })
    status: string;

    @Column({nullable: true})
    url: string;

    @Column({nullable: true})
    primaryColour: string;

    @Column({nullable: true})
    primaryTextColour: number;

    @Column({nullable: true})
    secondaryColour: string;

    @Column({nullable: true})
    secondaryTextColour: string;

    @Column({
        type: "enum",
        enum: background
    })
    background: string;

    @Column({nullable: true})
    backgroundProperty: string;

    @Column({
        type: "enum",
        enum: pictureFit
    })
    pictureFit: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'updatedBy' })
    updatedBy: User;    
};
