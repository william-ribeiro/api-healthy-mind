import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { DATABASE } from '../../../constants';
import { IPatient, IUser } from '../../../interfaces/entities';
import { Patient } from '../../patients';

@Entity(DATABASE.USERS)
export abstract class User implements IUser {
  constructor() {
    if (!this.id) this.id = uuidV4();
  }

  @PrimaryColumn()
  public readonly id: string;

  @CreateDateColumn()
  public createdAt: Date;

  @CreateDateColumn()
  public updatedAt: Date;

  @Column()
  public name: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column({ default: true })
  public enabled: boolean;

  @OneToMany(() => Patient, (patient) => patient.user)
  patient: IPatient[];
}
