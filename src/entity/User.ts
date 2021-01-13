import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, OneToOne, UpdateDateColumn, BeforeInsert, BeforeUpdate, Column, Timestamp } from "typeorm";
import { Roles } from './Roles';
import { IdealFirstDate } from './IdealFirstDate';
import { ExpensiveFirstDateMaster } from './ExpensiveFirstDateMaster';
import { Address } from './address';
import { UserToMatch } from './userToMatch';
import { Status } from './Status';


export enum Gender {
  NONE = "None",
  MALE = 'Men',
  FEMALE = 'Women',
  OTHER = 'Other'
}

export enum wantChildren {
  NONE = "None",
  NO = 'No',
  DEFINITELY = 'Definitely',
  SOMEDAY = 'Someday '
}

export enum educationLevel {
  NONE = "None",
  HIGH_SCHOOL = 'High School',
  TAFE = 'TAFE',
  BACHELORS_DEGREE = 'Bachelors degree',
  GRADUATE_DEGREE = 'Graduate degree',
  PHD = 'PhD'
}
export enum smoke {
  NONE = "None",
  NO = 'No',
  YES_SOMETIMES = 'Yes-sometimes',
  YES_DAILY = 'Yes-daily',
  YES_TRYING_TO_QUIT = 'Yes-trying to quit'
}

export enum drink {
  NONE = "None",
  NEVER = 'Never',
  SOCIAL_DRINKER = 'Social drinker',
  MODERATELY = 'Moderately',
  REGULARLY = 'Regularly'
}
export enum myersBriggs {
  NONE = "None",
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

@Entity({ name: "users" })
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userToMatchId: number;

  //cascade used
  @ManyToOne(() => UserToMatch)
  @JoinColumn({ name: 'userToMatchId' })
  usertomatch: UserToMatch;

  @Column({ nullable: true, })
  addressId: number;

  //cascade
  @ManyToOne(() => Address)
  @JoinColumn({ name: 'addressId' })
  address: Address;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;


  @Column("bigint", { nullable: true })
  phoneNumber: number;

  @Column({ nullable: true })
  countryCode: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  otpCode: number;

  @Column("timestamp", { nullable: true })
  otpCodeExpireTime: Timestamp;

  @Column({ nullable: true })
  statusId: number

  @ManyToOne(() => Status)
  @JoinColumn({ name: 'statusId' })
  status: Status;

  @Column({ nullable: true, type: 'date' })
  dob: Date;

  @Column({
    type: "enum",
    enum: Gender,
    default: Gender.NONE
  })
  gender: Gender;

  @Column({
    type: "enum",
    enum: Gender,
    default: Gender.NONE
  })
  interestedGender: Gender;


  @Column({ nullable: true, type: 'text' })
  AboutMe: string;

  @Column({ nullable: true })
  height: number;


  @Column({ nullable: true })
  job: string;

  @Column({ nullable: true, type: "json" })
  images: string;

  @Column({
    type: "enum",
    enum: wantChildren,
    default: wantChildren.NONE
  })
  wantChildren: wantChildren;

  @Column({
    type: "enum",
    enum: educationLevel,
    default: educationLevel.NONE
  })
  educationLevel: educationLevel;

  @Column({
    type: "enum",
    enum: smoke,
    default: educationLevel.NONE
  })
  smoke: smoke;

  @Column({
    type: "enum",
    enum: drink,
    default: educationLevel.NONE
  })
  drink: drink;

  @Column({
    type: "enum",
    enum: myersBriggs,
    default: educationLevel.NONE
  })
  myersBriggs: myersBriggs;



  @Column({ nullable: true })
  roleId: number;

  @ManyToOne(() => Roles)
  @JoinColumn({ name: 'roleId' })
  role: Roles;


  @Column({ nullable: true })
  idealFirstDateId: number;

  @ManyToOne(() => IdealFirstDate)
  @JoinColumn({ name: 'idealFirstDateId' })
  FirstDate: IdealFirstDate;


  @Column({ nullable: true })
  expensiveFirstDateId: number;

  @ManyToOne(() => ExpensiveFirstDateMaster)
  @JoinColumn({ name: 'expensiveFirstDateId' })
  Expensive: ExpensiveFirstDateMaster;

  @Column({ nullable: true })
  linkedIn: string;

  @CreateDateColumn({ nullable: false, type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false, select: false, type: 'timestamp' })
  updatedAt: Date;

  @Column({ nullable: true })
  count: number;

  // @BeforeInsert()
  // @BeforeUpdate()
  // transformData() {
  // this.email = this.email?.toLowerCase?.();
  //  }

}
