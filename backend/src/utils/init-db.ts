import { Pool } from 'pg'; // Import the `Pool` class from the pg (PostgreSQL) library. It allows pooling connections to the PostgreSQL database.

async function initializeDatabase(pool: Pool) {
  try {
    // First, check if the database 'todoist' exists. If not, create it.
    const dbCheckQuery = `
      SELECT FROM pg_database WHERE datname = 'todoist';
    `;

    // Execute the query to check if the 'todoist' database exists
    const dbExists = await pool.query(dbCheckQuery);

    if (dbExists.rowCount === 0) {
      // If the database doesn't exist, create it
      await pool.query('CREATE DATABASE todoist;');
      console.log('Database "todoist" created successfully.');
    } else {
      console.log('Database "todoist" already exists.');
    }

    // After ensuring the database exists, create the 'todo' table.
    // First, ensure that any existing table and sequence are dropped to avoid conflicts.
    // The 'todo' table has the following columns:
    // id: Primary key with auto-incrementing value.
    // title: The title of the todo, cannot be null.
    // completed: Boolean field for completion status, defaults to false.
    // description: Optional description of the todo item.
    // created_at: Timestamp for when the todo is created.
    // updated_at: Timestamp for when the todo is last updated.
    await pool.query(`
      DROP TABLE IF EXISTS todo;
      DROP SEQUENCE IF EXISTS todo_id_seq;
      CREATE TABLE todo (
        id SERIAL PRIMARY KEY,          
        title VARCHAR(50) NOT NULL,     
        completed BOOLEAN DEFAULT FALSE, 
        description TEXT,               
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
      );
    `);

    console.log('Table "todo" created successfully');
  } catch (error) {
    // If there is an error during database or table creation, log the error.
    console.error('Error initializing database:', error);
    throw error; // Rethrow the error to ensure the calling code can handle it.
  }
}

export default initializeDatabase;  // Export the function so it can be used in other parts of the app.
