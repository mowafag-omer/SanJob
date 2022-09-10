import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Company } from "../company";

@Entity("job")
export default class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  job_title: string;

  @Column()
  location: string;

  @Column('simple-array')
  contract_type: string[]

  @Column()
  sector: string

  @Column("text")
  description: string

  @Column("text")
  requirement: string

  @Column()
  start_date: Date

  @Column("text", { nullable: true })
  hiring_process: string

  @Column({nullable: true, default: "open"})
  status: string

  @ManyToOne(() => Company, (company) => company.jobs, { nullable: false, eager: true })
  company: Company

}
