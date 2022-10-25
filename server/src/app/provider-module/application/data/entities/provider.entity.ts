import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../../../../user-module/application/data/entities/user.entity';

@Entity()
export class ProviderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  domainName: string;

  @Column({ default: true, nullable: false })
  active: boolean;

  @Column({ nullable: true })
  parentProviderId: string;

  @Column({ nullable: true })
  sentence: string;

  @Column({ nullable: true })
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserEntity, (user) => user.provider, { nullable: true })
  users: UserEntity[];
}
