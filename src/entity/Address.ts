import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Column,
    UpdateDateColumn,
  } from 'typeorm';

  @Entity({name: 'address'})
  export class Address{
      @PrimaryGeneratedColumn()
      id:number;

      @Column({nullable: true})
      addressLine1: string;

      @Column({nullable:true})
      addressLine2: string;

      @Column({nullable:true})
      city: string;

      @Column({nullable: true})
      state: string;

      @Column({nullable:true})
      country:string;

      @Column({nullable: true})
      postCode: string;

      @Column({nullable: true})
      hash: string
  }
 