import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, Column, Timestamp } from "typeorm";

// export enum idealFirstDate {
//   COFFEE = "Coffee",
//   DRINKS = "Drinks",
//   DINNER = "Dinner",
//   LUNCH = "Lunch",
//   ACTIVITY = "Activity"
// }

@Entity()
export class IdealFirstDate {

  @PrimaryGeneratedColumn()
  id: number;
  // @Column({
  //   type: "enum",
  //   enum: idealFirstDate
  // })
  // idealFirstDate: idealFirstDate;
  @Column({ nullable: true })
  idealFirstDate: string;

  @Column()
  createdBy: number;

  @Column()
  updatedBy: number;

  @CreateDateColumn({ nullable: false, type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false, select: false, type: 'timestamp' })
  updatedAt: Date;

}
