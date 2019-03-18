// Copyright 2019 (c) Clarity Operations LLC
// Licensed under MIT
import { createConnection } from 'typeorm';
import { config } from '../main';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'mysql' || config.db.type,
      host: 'localhost' || config.db.host,
      port: 3306 || config.db.port,
      username: 'root' || config.db.username,
      password: 'root' || config.db.password,
      database: 'test' || config.db.name,
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }),
  },
];
