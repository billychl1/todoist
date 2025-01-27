import { AppDataSource } from '../config/database'; // Import the database connection instance
import { Todo } from '../models/Todo'; // Import the Todo model to interact with the 'todo' table in the database

// The TodoService class contains business logic for handling todo items.
// It communicates with the database through the 'todoRepository' to perform CRUD operations on the 'Todo' entity.
export class TodoService {
  private todoRepository;

  // Constructor initializes the 'todoRepository' using the AppDataSource connection.
  // The repository provides the methods to interact with the 'Todo' entity.
  constructor() {
    this.todoRepository = AppDataSource.getRepository(Todo);
  }

  // 'getAllTodos' method retrieves all todo items from the database.
  // It uses 'find()' to fetch all records from the 'todo' table.
  async getAllTodos() {
    return await this.todoRepository.find(); // Returns an array of all todos
  }

  // 'getTodo' method retrieves a single todo item by its ID.
  // It uses 'findOneBy' to fetch the todo that matches the given ID.
  async getTodo(id: number) {
    return await this.todoRepository.findOneBy({ id }); // Returns a single todo item or null if not found
  }

  // 'addTodo' method creates and saves a new todo item.
  // It accepts a 'todoData' object and creates a new Todo entity using 'todoRepository.create()'.
  // Only the title is passed in this case, but it can be extended to accept other fields.
  async addTodo(todoData: Partial<Todo>) {
    const todo = this.todoRepository.create({
      title: todoData.title, // Creates a new Todo instance with the provided title
    });
    return await this.todoRepository.save(todo); // Saves the new Todo in the database and returns the saved Todo
  }

  // 'updateTodo' method updates an existing todo item based on its ID.
  // It uses 'update()' to modify the todo's data and returns the updated todo if the update was successful.
  async updateTodo(id: number, todoData: Partial<Todo>) {
    const result = await this.todoRepository.update(id, todoData); // Updates the todo with the given ID
    if (result.affected === 0) return null; // If no rows were affected, return null (indicating the todo was not found or not updated)
    return this.todoRepository.findOneBy({ id }); // If updated, fetch and return the updated todo
  }

  // 'deleteTodo' method deletes a todo item based on its ID.
  // It uses 'delete()' to remove the todo from the database and returns 'true' if the delete was successful.
  async deleteTodo(id: number) {
    const result = await this.todoRepository.delete(id); // Deletes the todo item with the given ID
    return (result.affected ?? 0) > 0; // Returns true if one or more rows were affected (meaning the todo was deleted)
  }
}
