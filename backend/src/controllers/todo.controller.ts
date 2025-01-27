import { Request, Response } from 'express'; // Importing Express's Request and Response types for type-checking.
import { TodoService } from '../services/todo.service'; // Importing the TodoService to interact with todo data.

const todoService = new TodoService(); // Creating an instance of TodoService to handle CRUD operations.

// Controller to get all todos.
export const getTodos = async (req: Request, res: Response) => {
  try {
    // Calling the service method to get all todos from the database.
    const todos = await todoService.getAllTodos();
    // Returning the todos in the response as a JSON object.
    return res.json(todos);
  } catch (error) {
    // Handling potential errors (e.g., database connection issues).
    return res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

// Controller to get a specific todo by its ID.
export const getTodo = async (req: Request, res: Response) => {
  try {
    // Parsing the ID from the request parameters and calling the service to fetch the todo.
    const todo = await todoService.getTodo(parseInt(req.params.id));
    // If the todo exists, return it as JSON.
    if (todo) {
      return res.json(todo);
    }
    // If no todo was found for the given ID, return a 404 error.
    return res.status(404).json({ error: 'Todo not found' });
  } catch (error) {
    // Handling errors if the fetching of the todo fails.
    return res.status(500).json({ error: 'Failed to fetch todo' });
  }
};

// Controller to create a new todo.
export const createTodo = async (req: Request, res: Response) => {
  try {
    // Checking if the title length is more than 50 characters.
    if (req.body.title.length > 50) {
      return res.status(400).json({ error: 'Title must not exceed 50 characters' });
    }
    // Calling the service to create a new todo and passing the request body.
    const todo = await todoService.addTodo(req.body);
    // Returning the newly created todo with a status of 201 (Created).
    return res.status(201).json(todo);
  } catch (error) {
    // Catching potential errors during creation.
    return res.status(500).json({ error: 'Failed to create todo' });
  }
};

// Controller to update an existing todo by its ID.
export const updateTodo = async (req: Request, res: Response) => {
  try {
    // Validating the title length to ensure it doesn't exceed 50 characters.
    if (req.body.title.length > 50) {
      return res.status(400).json({ error: 'Title must not exceed 50 characters' });
    }
    // Calling the service to update the todo based on the provided ID and data.
    const todo = await todoService.updateTodo(parseInt(req.params.id), req.body);
    // If the todo is found and updated, return the updated todo.
    if (todo) {
      return res.json(todo);
    }
    // If no todo is found with the given ID, return a 404 error.
    return res.status(404).json({ error: 'Todo not found' });
  } catch (error) {
    // Handling errors that might occur during the update process.
    return res.status(500).json({ error: 'Failed to update todo' });
  }
};

// Controller to delete a todo by its ID.
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    // Calling the service to delete a todo based on the provided ID.
    const success = await todoService.deleteTodo(parseInt(req.params.id));
    // If the todo was successfully deleted, return a 204 status (No Content).
    if (success) {
      return res.status(204).send();
    }
    // If no todo is found with the given ID, return a 404 error.
    return res.status(404).json({ error: 'Todo not found' });
  } catch (error) {
    // Handling potential errors during the deletion process.
    return res.status(500).json({ error: 'Failed to delete todo' });
  }
};
