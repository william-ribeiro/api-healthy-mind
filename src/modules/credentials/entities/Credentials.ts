import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { DATABASE } from '@/constants';
import { ICredentials } from '@/interfaces';

@Entity(DATABASE.CREDENTIALS)
export class Credentials implements ICredentials {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @CreateDateColumn()
  public createdAt: Date;

  @CreateDateColumn()
  public updatedAt: Date;

  @Column()
  public ownerId: string;

  @Column()
  public accessToken: string;

  @Column()
  public refreshToken: string;

  @Column()
  public expiresIn: Date;

  @Column({ default: true })
  public isValid: boolean;
}
