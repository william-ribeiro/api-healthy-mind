import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { DATABASE } from '@/constants';
import { IPatient, IUser } from '@/interfaces';
import { Address, Role, User } from '@/modules';

@Entity(DATABASE.PATIENTS)
export class Patient implements IPatient {
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
  public userId: string;

  @Column()
  public addressId: number;

  @Column()
  public name: string;

  @Column({ unique: true })
  public email: string;

  @Column({ unique: true })
  public document: string;

  @Column({ default: null, nullable: true })
  public gender: string;

  @Column({ default: null, nullable: true })
  public birthDate: string;

  @Column({ default: null, nullable: true })
  public phone: string;

  @Column({ default: true })
  public enabled: boolean;

  @Column()
  public roleId: number;

  @Column()
  public password: string;

  @Column({ default: true })
  public isFirstLogin: boolean;

  @ManyToOne(() => User, (user) => user.patient)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: IUser;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'addressId' })
  address: Address;

  @ManyToOne(() => Role, (role) => role.patients)
  role: Role;
}
