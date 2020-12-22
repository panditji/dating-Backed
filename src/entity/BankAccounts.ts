import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('bankaccounts')
export class BankAccounts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stripeId: string;

  @Column({ nullable: true })
  accountHolderName: string;

  @Column({ nullable: true })
  accountHolderType: string;

  @Column({ nullable: true })
  bankName: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  currency: string;

  @Column({ nullable: true })
  customer: string;

  @Column({ nullable: true })
  fingerPrint: string;

  @Column({ nullable: true })
  last4: number;

  @Column({ nullable: true })
  routingNumber: string;
}
