import yn from 'yn';
import { ConnectionOptions } from 'typeorm';
import { UserTypeEntity } from '../user-type-module/application/entities/user-type.entity';
import { ProviderEntity } from '../provider-module/application/data/entities/provider.entity';
import { UserEntity } from '../user-module/application/data/entities/user.entity';
import { InvitationEntity } from '../invitation-module/application/data/entities/invitation.entity';

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  POSTGRES_SSL,
} = process.env;

export = {
  type: 'postgres',

  host: POSTGRES_HOST || 'localhost',
  port: parseInt(POSTGRES_PORT) || 5432,
  // username: POSTGRES_USER || 'kuprins',
  // password: POSTGRES_PASSWORD || 'admin',
  database: POSTGRES_DATABASE || 'kuprins',

  entities: [UserTypeEntity, ProviderEntity, UserEntity, InvitationEntity],

  migrationsTableName: 'migration',

  migrations: [
    'build/src/app/shared-module/secondary-adapters/typeorm/migrations/**',
  ],
  cli: {
    migrationsDir:
      'src/app/shared-module/secondary-adapters/typeorm/migrations',
  },

  synchronize: false,
  ssl: yn(POSTGRES_SSL),
} as ConnectionOptions;
