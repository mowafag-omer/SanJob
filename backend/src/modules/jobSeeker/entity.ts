import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "../user";

@Entity("job_seeker")
export default class JobSeeker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  birthdate: string;

  @Column()
  location: string;

  @Column()
  profile_title: string;

  @Column()
  sector: number;

  @Column()
  linkedin: string;

  @Column()
  website: string;

  @Column()
  github: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User
}
