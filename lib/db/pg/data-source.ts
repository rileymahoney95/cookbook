import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { config } from 'dotenv';
import { SeederOptions } from 'typeorm-extension';
import DatabaseSeeder from './seeders/DatabaseSeeder';

config();

const DATA_SOURCE_OPTIONS: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'rileymahoney',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'cookbook',
  synchronize: false, // Automatically synchronize the schema (use with caution in production)
  logging: false,
  entities: [join(__dirname, "entities", "*.entity.{ts,js}")],
  migrations: [join(__dirname, "migrations", "*.{ts,js}")],
  seeds: [DatabaseSeeder],
};

export const pgDatasource = new DataSource(DATA_SOURCE_OPTIONS);

pgDatasource.initialize();