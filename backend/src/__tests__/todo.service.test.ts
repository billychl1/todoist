import { TodoService } from '../services/todo.service';
import { Todo } from '../models/Todo';
import { AppDataSource } from '../config/database';

// Mock the TypeORM repository
const mockRepository = {
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  findOneBy: jest.fn(),
  delete: jest.fn(),
};

// Mock the getRepository function
jest.mock('typeorm', () => ({
  ...jest.requireActual('typeorm'),
  getRepository: () => mockRepository
}));

// Mock the AppDataSource initialization
jest.mock('../config/database', () => ({
  AppDataSource: {
    initialize: jest.fn().mockResolvedValue(true),
    getRepository: () => mockRepository
  }
}));

describe('TodoService', () => {
  let todoService: TodoService;
  const mockTodo: Todo = {
    id: 1,
    title: 'Test Todo',
    description: 'Test Description',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(async () => {
    // Initialize the data source and create a new TodoService instance before each test
    await AppDataSource.initialize();
    todoService = new TodoService();
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  // Test the getAllTodos method
  describe('getAllTodos', () => {
    it('should return all todos', async () => {
      mockRepository.find.mockResolvedValue([mockTodo]);

      const result = await todoService.getAllTodos();

      // Check if the result matches the expected mock data
      expect(result).toEqual([mockTodo]);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  // Test the addTodo method
  describe('addTodo', () => {
    it('should create a new todo', async () => {
      const newTodo = { title: 'New Todo', completed: false };
      const createdTodo = { ...newTodo, id: 1, createdAt: new Date(), updatedAt: new Date() };
      mockRepository.create.mockReturnValue(createdTodo);
      mockRepository.save.mockResolvedValue(createdTodo);

      const result = await todoService.addTodo(newTodo);

      // Check if the created todo is returned correctly
      expect(result).toEqual(createdTodo);
      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });

  // Test the updateTodo method
  describe('updateTodo', () => {
    it('should update an existing todo', async () => {
      const updateData = { title: 'Updated Todo', completed: true };
      const updatedTodo = { ...mockTodo, ...updateData };
      mockRepository.findOneBy.mockResolvedValue(updatedTodo);
      mockRepository.update.mockResolvedValue({ affected: 1 });

      const result = await todoService.updateTodo(1, updateData);

      // Check if the updated todo matches the expected result
      expect(result).toEqual(updatedTodo);
      expect(mockRepository.update).toHaveBeenCalledWith(1, updateData);
    });

    it('should return null when todo not found', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);
      mockRepository.update.mockResolvedValue({ affected: 0 });

      const result = await todoService.updateTodo(999, { title: 'Not Found' });

      // Ensure that null is returned when the todo is not found
      expect(result).toBeNull();
    });
  });

  // Test the deleteTodo method
  describe('deleteTodo', () => {
    it('should delete a todo', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await todoService.deleteTodo(1);

      // Check if the deletion was successful
      expect(result).toBe(true);
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should return false when todo not found', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });

      const result = await todoService.deleteTodo(999);

      // Ensure that false is returned when the todo is not found
      expect(result).toBe(false);
    });
  });
});
