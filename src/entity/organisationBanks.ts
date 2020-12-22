import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Organisation } from './Organisation';
import { BankAccounts } from './BankAccounts';
import { User } from './User';

export enum status {
  ACTIVE = 'active',
  DELETED = 'deleted',
}

@Entity({ name: 'organisationbanks' })
export class OrganisationBanks {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Organisation)
  @JoinColumn()
  organisation: Organisation;

  @OneToOne(() => BankAccounts)
  @JoinColumn()
  bank: BankAccounts;

  @Column({
    type: 'enum',
    enum: status,
    default: status.ACTIVE,
  })
  status: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'createdBy' })
  createdBy: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updatedBy' })
  updatedBy: User;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
