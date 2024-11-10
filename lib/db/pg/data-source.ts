import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { config } from 'dotenv';
import { SeederOptions } from 'typeorm-extension';
// import DatabaseSeeder from './seeders/DatabaseSeeder';
import {
  UserEntity,
  RecipeEntity,
  IngredientEntity,
  StepEntity,
  RecipeIngredientEntity,
  NutritionalInfoEntity,
} from './entities';

config();

const customLogger = {
  logQuery: () => {},
  logQueryError: (error: string, query: string) => {
    console.error('Database Query Error:', error);
  },
  logQuerySlow: (time: number, query: string) => {
    console.warn('Slow Query:', query);
  },
  logSchemaBuild: () => {},
  logMigration: () => {},
  log: (level: 'log' | 'info' | 'warn', message: string) => {
    if (level === 'warn' || level === 'info') {
      console[level](message);
    }
  },
};

const DATA_SOURCE_OPTIONS: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'rileymahoney',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'cookbook',
  synchronize: false,
  logging: true,
  logger: customLogger,
  // entities: [join(__dirname, "entities", "*.entity.{ts,js}")],
  entities: [
    UserEntity,
    RecipeEntity,
    IngredientEntity,
    StepEntity,
    RecipeIngredientEntity,
    NutritionalInfoEntity,
  ],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  // seeds: [DatabaseSeeder],
};

export const pgDatasource = new DataSource(DATA_SOURCE_OPTIONS);

let initialized = false;

export const initializeDataSource = async () => {
  if (!initialized) {
    try {
      await pgDatasource.initialize();
      initialized = true;
      console.log('Data Source has been initialized!');
    } catch (err) {
      console.error('Error during Data Source initialization:', err);
      throw err;
    }
  }
  return pgDatasource;
};
