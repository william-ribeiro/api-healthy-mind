import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DATABASE } from '../../../constants';
import { IRole } from '../../../interfaces';
import { Patient } from '../../patients';
import { User } from '../../users';

@Entity(DATABASE.ROLES)
export class Role implements IRole {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @CreateDateColumn()
  public createdAt: Date;

  @CreateDateColumn()
  public updatedAt: Date;

  @Column()
  public name: string;

  @Column({ default: true })
  public enabled: boolean;

  @OneToMany(() => Patient, (patient) => patient.role)
  patients?: Patient[];

  @OneToMany(() => User, (user) => user.role)
  users?: User[];
}
