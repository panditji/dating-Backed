import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

export enum status {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  DELETED = 'deleted',
}

@Entity({ name: 'organisations' })
export class Organisation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isCompany: boolean;

  @Column('bigint', { nullable: true })
  abn: number;

  @Column()
  aboutTheOrganisation: string;

  @Column({ default: 0 })
  taxExamptOrganisation: boolean;

  @Column({ nullable: true })
  imagePath: string;

  @Column({
    type: 'enum',
    enum: status,
    default: status.PUBLISHED,
  })
  status: string;

  @Column('bigint', { nullable: true })
  deletedBy: number;

  @Column('bigint', { nullable: true })
  updatedBy: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
