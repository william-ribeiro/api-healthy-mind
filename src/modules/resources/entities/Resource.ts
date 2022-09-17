import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DATABASE } from '../../../constants';
import { IResource } from '../../../interfaces';
import { Session } from '../../sessions';

@Entity(DATABASE.RESOURCES)
export class Resource implements IResource {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @CreateDateColumn()
  public createdAt: Date;

  @CreateDateColumn()
  public updatedAt: Date;

  @Column()
  public userId: string;

  @Column()
  public category: string;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column({ default: true })
  public enabled: boolean;

  @OneToMany(() => Session, (session) => session.resource)
  sessions: Session[];
}
