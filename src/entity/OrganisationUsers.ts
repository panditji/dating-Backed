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
import { User } from './User';

export enum role {
  ADMIN = 'admin',
  OWNER = 'owner',
  MANAGER = 'manager',
}

export enum status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DELETED = 'deleted',
  INVITED = 'invited',
}

@Entity('organisationusers')
export class OrganisationUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Organisation)
  @JoinColumn()
  organisation: Organisation;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({
    type: 'enum',
    enum: role,
    default: role.OWNER,
  })
  role: string;

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
