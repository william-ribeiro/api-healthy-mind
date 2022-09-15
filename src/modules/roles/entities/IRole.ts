import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DATABASE } from '../../../constants';
import { IRole } from '../../../interfaces';

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
}
