import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Job } from "../job";
import { User } from "../user";

@Entity("company")
export default class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: true })
  logo_url: string

  @Column()
  name: string;

  @Column()
  location: string;

  @Column('simple-array')
  sector: string[];

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

  @OneToMany(() => Job, (job) => job.company)
  jobs: Job[]
}
