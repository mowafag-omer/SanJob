import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("applicant")
export default class Applicant {
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
  profile_headline: string;

  @Column()
  sector: number;
}
