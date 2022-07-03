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
  sector: number;

  @Column("text")
  presentation: string;

  @Column()
  founding_year: string;

  @Column()
  employees: number

  @Column()
  website: string

  @OneToOne(() => User)
  @JoinColumn()
  user: User
}
