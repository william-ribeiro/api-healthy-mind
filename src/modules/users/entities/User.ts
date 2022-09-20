import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { DATABASE } from '../../../constants';
import { IPatient, IUser } from '../../../interfaces/entities';
import { Patient } from '../../patients';
import { Role } from '../../roles';

@Entity(DATABASE.USERS)
export class User implements IUser {
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

  @Column()
  public roleId: number;

  @Column({ nullable: true })
  public professionalRecord: string;

  @OneToMany(() => Patient, (patient) => patient.user)
  patient: IPatient[];

  @ManyToOne(() => Role, (role) => role.patients)
  role: Role;
}
