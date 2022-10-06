import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Application } from "../application";
import { Company } from "../company";

@Entity("job_offer")
export default class JobOffer {
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
  
  @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  posted_at: string

  @Column("text", { nullable: true })
  hiring_process: string

  @Column({nullable: true, default: "open"})
  status: string

  @ManyToOne(() => Company, (company) => company.jobOffers, { nullable: false, eager: true })
  company: Company

  @OneToMany(() => Application, (applicatoin) => applicatoin.jobOffer)
  applications: Application[]
}
