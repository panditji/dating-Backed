import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, Column, Timestamp, ManyToOne } from "typeorm";


export enum wantChildren {
    NOT_SELECTED = "Not Selected",
    NO = 'No',
    DEFINITELY = 'Definitely',
    SOMEDAY = 'Someday '
}

export enum educationLevel {
    NOT_SELECTED = "Not Selected",
    HIGH_SCHOOL = 'High School',
    TAFE = 'TAFE',
    BACHELORS_DEGREE = 'Bachelors degree',
    GRADUATE_DEGREE = 'Graduate degree',
    PHD = 'PhD'
}

export enum myersBriggs {
    NOT_SELECTED = "Not Selected",
    NO = 'No',
    INTJ = 'INTJ',
    INTP = 'INTP',
    ENTJ = 'ENTJ',
    ENTP = 'ENTP',
    INFJ = 'INFJ',
    INFP = 'INFP',
    ENFJ = 'ENFJ',
    ENFP = 'ENFP',
    ISTJ = 'ISTJ',
    ESFJ = 'ESFJ',
    ISTP = 'ISTP',
    ISFP = 'ISFP',
    ESTP = 'ESTP',
    ESFP = 'ESFP'

}

export enum Gender {
    NOT_SELECTED = "Not Selected",
    MALE = 'Men',
    FEMALE = 'Women',
    OTHER = 'Other'
}

@Entity()
export class UserToMatch {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    heightMin: number;

    @Column({ nullable: true })
    heightMax: number;

    @Column({ nullable: true })
    ageMin: number;

    @Column({ nullable: true })
    ageMax: number;

    @Column({
        type: "enum",
        enum: wantChildren,
        default: wantChildren.NOT_SELECTED
    })
    wantChildren: wantChildren;

    @Column({
        type: "enum",
        enum: educationLevel,
        default: educationLevel.NOT_SELECTED
    })
    educationLevel: educationLevel;

    @Column({
        type: "enum",
        enum: myersBriggs,
        default: myersBriggs.NOT_SELECTED
    })
    myersBriggs: myersBriggs;

    @Column({
        type: "enum",
        enum: Gender,
        default: Gender.NOT_SELECTED
    })
    interestedGender: Gender;

    @Column({ nullable: true })
    distanceMax: number;

    @CreateDateColumn({ nullable: false, type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ nullable: false, select: false, type: 'timestamp' })
    updatedAt: Date;

}
