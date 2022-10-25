import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ProviderEntity } from '../../../../provider-module/application/data/entities/provider.entity';
import { InvitationEntity } from '../../../../invitation-module/application/data/entities/invitation.entity';
import { UserTypeEntity } from '../../../../user-type-module/application/entities/user-type.entity';

@Entity()
@Unique(['email', 'providerId'])
@Unique(['phoneNumber', 'providerId'])
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  namePrefix: string; // TODO: enum

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  practitionerId?: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  providerId: string;

  @Column({ default: false })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ProviderEntity, (provider) => provider.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'providerId' })
  provider: ProviderEntity;

  @Column({ nullable: false })
  userTypeId: string;

  @ManyToOne(() => UserTypeEntity, (userType) => userType.name, {
    nullable: false,
  })
  @JoinColumn({ name: 'userTypeId' })
  userType: UserTypeEntity;

  @OneToMany(() => InvitationEntity, (invitation) => invitation.user, {
    nullable: true,
  })
  invitations: InvitationEntity[];
}
