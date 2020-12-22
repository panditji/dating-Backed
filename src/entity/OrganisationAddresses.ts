import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { Organisation } from './Organisation';
import { Address } from './Address';
import { User } from './User';

export enum addressType {
  COMPANY = 'company',
  POSTAL = 'postal',
}

@Entity({ name: 'organisationaddresses' })
export class OrganisationAddresses {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Organisation)
  @JoinColumn()
  organisation: Organisation;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @Column({
    type: 'enum',
    enum: addressType,
    default: addressType.COMPANY,
  })
  type: string;

  @Column({ default: false })
  isPostalAddress: boolean;

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
