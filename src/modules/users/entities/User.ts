import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { IUser } from '../../../interfaces/entities';

@Entity('users')
export class User implements IUser {
  @PrimaryColumn()
  public readonly id: string;

  @CreateDateColumn()
  public created_at: Date;

  @CreateDateColumn()
  public updated_at: Date;

  @Column()
  public name: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column({ default: true })
  public enabled: boolean;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
