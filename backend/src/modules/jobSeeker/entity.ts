import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "../user";

@Entity("job_seeker")
export default class JobSeeker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  gender: string;

  @Column()
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  birthdate: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  profile_title: string;

  @Column({ nullable: true })
  sector: string;

  @Column({ nullable: true })
  linkedin: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  github: string;

  @OneToOne(() => User, { nullable: false, eager: true })
  @JoinColumn()
  user: User
}
