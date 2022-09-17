import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Timestamp, CreateDateColumn } from "typeorm";
import { JobOffer } from "../jobOffer";
import { JobSeeker } from "../jobSeeker";

@Entity("application")
export default class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "timestamp", nullable: true, default: () => "CURRENT_TIMESTAMP"})
  applying_date: string;

  @Column({nullable: true, default: "sent"})
  status: string = "sent"

  @ManyToOne(() => JobOffer, (jobOffer) => jobOffer.applications, { nullable: false, eager: true })
  jobOffer: JobOffer

  @ManyToOne(() => JobSeeker, (jobSeeker) => jobSeeker.applications, { nullable: false, eager: true })
  jobSeeker: JobSeeker
}
