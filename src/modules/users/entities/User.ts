import { Column, CreateDateColumn, Entity, PrimaryColumn, Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { DATABASE } from '../../../constants';
import { IUser } from '../../../interfaces/entities';

@Entity(DATABASE.USERS)
export abstract class User implements IUser {
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

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
  abstract repository(): Repository<IUser>;

  abstract getById(storeId: number): Promise<IUser | undefined>;
}
