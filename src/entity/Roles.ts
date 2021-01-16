import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, Column, Timestamp } from "typeorm";

export enum name {
  ADMIN = "admin",
  SHOPOWNER = "shopOwner",
  NORMAL = "normal"
}

@Entity()
export class Roles {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: name
  })
  name: name;

  @CreateDateColumn({ nullable: false, type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false, select: false, type: 'timestamp' })
  updatedAt: Date;

  

}
