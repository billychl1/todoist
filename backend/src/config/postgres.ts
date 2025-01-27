import { Pool } from 'pg'; // Import the Pool class from the 'pg' library. It manages a pool of database connections to PostgreSQL.


// Database connection configuration
export const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'postgres',
    database: process.env.DB_NAME || 'todoist',
    password: process.env.DB_PASSWORD || 'postgres',
    port: parseInt(process.env.DB_PORT || '5432'),
});