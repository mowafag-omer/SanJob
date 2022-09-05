import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Company } from "../company";

@Entity("job")
export default class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  job_title: string;

  @Column()
  location: string;

  @Column()
  contract_type: string;

  @Column("text")
  description: string

  @Column("text")
  requirement: string

  @Column()
  start_date: Date

  @Column("text")
  hiring_process: string = "open"

  @Column()
  status: string

  @OneToOne(() => Company)
  @JoinColumn()
  company: Company

}
