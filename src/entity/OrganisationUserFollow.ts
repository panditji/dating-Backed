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
  
  
  @Entity('organisationuserfollow')
  export class OrganisationUserFollow {
    @PrimaryGeneratedColumn()
    id: number;
  
    @OneToOne(() => Organisation)
    @JoinColumn()
    organisation:Organisation ;
  
    @ManyToOne(() => User)
    @JoinColumn()
    user: User;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  