import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { DATABASE } from '@/constants';
import { IAddress } from '@/interfaces';
@Entity(DATABASE.ADDRESS)
export class Address implements IAddress {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @CreateDateColumn()
  public createdAt: Date;

  @CreateDateColumn()
  public updatedAt: Date;

  @Column()
  public postalCode: string;

  @Column()
  public street: string;

  @Column()
  public number: string;

  @Column({ default: null, nullable: true })
  public details: string;

  @Column()
  public district: string;

  @Column()
  public city: string;

  @Column()
  public state: string;

  @Column()
  public country: string;

  @Column({ default: true })
  public enabled: boolean;
}
