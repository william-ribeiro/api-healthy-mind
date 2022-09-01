import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DATABASE } from '../../../constants';
import { IUserCredentials } from '../../../interfaces';
import { User } from '../../users';

@Entity(DATABASE.USER_CREDENTIALS)
export abstract class UserCredentials implements IUserCredentials {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @CreateDateColumn()
  public createdAt: Date;

  @CreateDateColumn()
  public updatedAt: Date;

  @Column()
  public userId: string;

  @Column()
  public accessToken: string;

  @Column()
  public refreshToken: string;

  @Column()
  public expiresIn: Date;

  @Column({ default: true })
  public isValid: boolean;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
