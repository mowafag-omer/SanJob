import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;
}
