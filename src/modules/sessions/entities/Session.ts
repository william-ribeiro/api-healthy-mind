import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DATABASE } from '../../../constants';
import { ISession } from '../../../interfaces/entities';
import { Patient } from '../../patients';
import { User } from '../../users';

@Entity(DATABASE.SESSIONS)
export class Session implements ISession {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @CreateDateColumn()
  public createdAt: Date;

  @CreateDateColumn()
  public updatedAt: Date;

  @Column()
  public userId: string;

  @Column()
  public patientId: string;

  @Column()
  public status: string;

  @Column()
  public subject: string;

  @Column()
  public duration: string;

  @Column()
  public type: string;

  @Column()
  public comments: string;

  @Column({ default: true })
  public enabled: boolean;

  @Column()
  public appointmentDate: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToOne(() => Patient)
  @JoinColumn({ name: 'patientId' })
  patient: Patient;
}
