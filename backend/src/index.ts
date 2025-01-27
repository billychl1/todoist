import express from 'express';  // Import Express framework
import cors from 'cors';  // Import CORS middleware to handle cross-origin requests
import todoRoutes from './routes/todo.routes';  // Import routes for handling todo-related API requests
import { config } from 'dotenv';  // Import dotenv for loading environment variables from a .env file
import initializeDatabase from './utils/init-db';  // Import custom function to initialize the database
import { pool } from './config/postgres';  // Import Postgres connection pool for raw SQL queries
import { AppDataSource } from './config/database';  // Import TypeORM data source for database interaction

// Load environment variables from the .env file
config();  // This reads .env file and loads the variables into process.env

// Initialize the Express application to build the backend API.
const app = express();

// Middleware to handle Cross-Origin Resource Sharing (CORS)
// This is needed if your frontend and backend are hosted on different domains
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());  // Automatically parses JSON body data into JavaScript objects

// Function to initialize the database and set up the data source for TypeORM
async function initDB() {
    try {
        // Initialize the PostgreSQL database using the pool object
        // This will run a check to create the database and schema if it does not exist
        await initializeDatabase(pool);
        console.log('Database initialization completed');  // Log successful database initialization

        // Initialize the TypeORM data source (this handles connections and entities)
        // This is necessary for any interactions with the database via TypeORM
        await AppDataSource.initialize();
        console.log("DataSource established");  // Log successful connection to the data source

        // Mount the todo API routes at '/api/todos' endpoint
        app.use('/api/todos', todoRoutes);  // This sets up the routes for handling todo operations
    } catch (error) {
        // If any error occurs during the DB initialization or DataSource setup, log it
        console.error('Error during database initialization:', error);
        process.exit(1);  // Exit the application if the database connection fails
    }
}

// Call the database initialization function when the app starts
initDB();

// Start the Express server on the specified port
const PORT = process.env.PORT || 3000;  // Use the port from environment variables or fallback to 3000
app.listen(PORT, () => {
    // Once the server is up and running, log the status
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);  // Log the current environment (development/production)
});
