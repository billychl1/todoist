import { Todo } from '../models/Todo';  // Import the Todo entity from the models folder
import { DataSource } from 'typeorm';  // Import DataSource from TypeORM, which is used to manage the database connection and interaction

// TypeORM DataSource
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'postgres',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'todoist',
  entities: [Todo],  // Specifies the entities (models) to be used by TypeORM; here it’s the Todo model
  synchronize: false,  // NOT Synchronizes the database schema with the TypeORM entities
});
