import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, Column, Timestamp } from "typeorm";

// export enum expensiveFirstDate {
//   UNDER_20 = "Under $20",
//   UNDER_50 = "Under $50",
//   BETWEEN_50_100 = "$50 to $100",
//   OVER_100 = "Over $100"
// }

@Entity()
export class ExpensiveFirstDateMaster {

  @PrimaryGeneratedColumn()
  id: number;

  // @Column({
  //   type: "enum",
  //   enum: expensiveFirstDate
  // })
  // expensiveFirstDate: expensiveFirstDate;

  @Column({ nullable: true })
  expensiveFirstDate: string;

  @Column()
  createdBy: number;

  @Column()
  updatedBy: number;

  @CreateDateColumn({ nullable: false, type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false, select: false, type: 'timestamp' })
  updatedAt: Date;



}
