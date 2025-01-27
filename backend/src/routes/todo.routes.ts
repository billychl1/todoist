import express from 'express'; // Importing the Express library to create routes and handle HTTP requests.
import { getTodos, getTodo, createTodo, updateTodo, deleteTodo } from '../controllers/todo.controller'; // Importing controller functions that handle the logic for each route.

const router = express.Router(); // Creating a new Express Router instance. This allows you to group related routes together.

// Define the route to fetch all todos.
router.get('/', getTodos);
// GET request to the root of /todos, which will call the `getTodos` function from the controller to fetch all todos.

// Define the route to fetch a specific todo by ID.
router.get('/:id', getTodo);
// GET request to /todos/:id, where `:id` is a dynamic parameter, passed to `getTodo` to retrieve a specific todo by its ID.

// Define the route to create a new todo.
router.post('/', createTodo);
// POST request to /todos, which will call the `createTodo` function to create a new todo in the database.

// Define the route to update an existing todo by ID.
router.put('/:id', updateTodo);
// PUT request to /todos/:id, where `:id` is a dynamic parameter, passed to `updateTodo` to modify an existing todo by its ID.

// Define the route to delete a todo by ID.
router.delete('/:id', deleteTodo);
// DELETE request to /todos/:id, where `:id` is the dynamic parameter used to specify which todo to delete. This calls the `deleteTodo` function to remove it from the database.

export default router;
// Export the router instance so it can be used in the main app (e.g., in `app.ts` or `server.ts`).
