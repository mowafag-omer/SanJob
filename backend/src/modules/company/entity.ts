import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "../user";

@Entity("company")
export default class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  sector: string;

  @Column("text")
  presentation: string;

  @Column()
  founding_year: string;

  @Column()
  employees: number

  @Column({ nullable: true })
  website: string 

  @OneToOne(() => User, { nullable: false, eager: true })
  @JoinColumn()
  user: User
}
