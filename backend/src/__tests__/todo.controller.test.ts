import { Request, Response } from 'express';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todo.controller';
import { TodoService } from '../services/todo.service';

// Mock the TodoService to prevent actual database calls and isolate controller logic
jest.mock('../services/todo.service');

describe('Todo Controller', () => {
    // Variables to mock request and response objects
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let responseJson: jest.Mock;
    let responseStatus: jest.Mock;

    // Set up mocks before each test
    beforeEach(() => {
        // Reset mock functions before each test
        responseJson = jest.fn();
        responseStatus = jest.fn().mockReturnThis(); // Chainable mock return for status
        mockRequest = {}; // Start with empty mockRequest object
        mockResponse = {
            json: responseJson,  // Mock json response
            status: responseStatus,  // Mock status response
            send: jest.fn()  // Mock send for response
        };
    });

    // Test getTodos method of TodoController
    describe('getTodos', () => {
        it('should return all todos', async () => {
            // Define mock todos data returned by the service
            const mockTodos = [
                { id: 1, title: 'Test Todo 1', completed: false },
                { id: 2, title: 'Test Todo 2', completed: true }
            ];

            // Mock the response of TodoService's getAllTodos method
            (TodoService.prototype.getAllTodos as jest.Mock).mockResolvedValue(mockTodos);

            // Call the controller function with the mock request and response
            await getTodos(mockRequest as Request, mockResponse as Response);

            // Assert that the response json method was called with the mock todos
            expect(responseJson).toHaveBeenCalledWith(mockTodos);
        });
    });

    // Test createTodo method of TodoController
    describe('createTodo', () => {
        it('should create a new todo when valid data is provided', async () => {
            // Mock request body for new todo
            const mockTodo = { id: 1, title: 'New Todo', completed: false };
            mockRequest.body = { title: 'New Todo' };

            // Mock the TodoService addTodo method to return the created todo
            (TodoService.prototype.addTodo as jest.Mock).mockResolvedValue(mockTodo);

            // Call the controller function with the mock request and response
            await createTodo(mockRequest as Request, mockResponse as Response);

            // Assert that the response status is 201 (Created) and the json is called with the created todo
            expect(responseStatus).toHaveBeenCalledWith(201);
            expect(responseJson).toHaveBeenCalledWith(mockTodo);
        });

        it('should return 400 when title exceeds 50 characters', async () => {
            // Test case where title exceeds 50 characters
            mockRequest.body = { title: 'A'.repeat(51) };

            // Call the controller method with the invalid data
            await createTodo(mockRequest as Request, mockResponse as Response);

            // Assert that a 400 status is returned with the appropriate error message
            expect(responseStatus).toHaveBeenCalledWith(400);
            expect(responseJson).toHaveBeenCalledWith({
                error: 'Title must not exceed 50 characters'
            });
        });
    });

    // Test updateTodo method of TodoController
    describe('updateTodo', () => {
        it('should update todo when valid data is provided', async () => {
            // Mock request data for updating todo
            const mockTodo = { id: 1, title: 'Updated Todo', completed: true };
            mockRequest.params = { id: '1' };
            mockRequest.body = { title: 'Updated Todo', completed: true };

            // Mock the TodoService updateTodo method to return the updated todo
            (TodoService.prototype.updateTodo as jest.Mock).mockResolvedValue(mockTodo);

            // Call the controller method with the mock request and response
            await updateTodo(mockRequest as Request, mockResponse as Response);

            // Assert that the response json method is called with the updated todo
            expect(responseJson).toHaveBeenCalledWith(mockTodo);
        });

        it('should return 404 when todo is not found', async () => {
            // Mock request for non-existing todo
            mockRequest.params = { id: '999' };
            mockRequest.body = { title: 'Updated Todo', completed: true };

            // Mock the TodoService updateTodo to return null when todo is not found
            (TodoService.prototype.updateTodo as jest.Mock).mockResolvedValue(null);

            // Call the controller method with the mock request and response
            await updateTodo(mockRequest as Request, mockResponse as Response);

            // Assert that a 404 status is returned with the appropriate error message
            expect(responseStatus).toHaveBeenCalledWith(404);
            expect(responseJson).toHaveBeenCalledWith({ error: 'Todo not found' });
        });
    });

    // Test deleteTodo method of TodoController
    describe('deleteTodo', () => {
        it('should delete todo successfully', async () => {
            // Mock request for deleting an existing todo
            mockRequest.params = { id: '1' };

            // Mock the TodoService deleteTodo to return true (successful deletion)
            (TodoService.prototype.deleteTodo as jest.Mock).mockResolvedValue(true);

            // Call the controller method with the mock request and response
            await deleteTodo(mockRequest as Request, mockResponse as Response);

            // Assert that the response status is 204 (No Content) indicating successful deletion
            expect(responseStatus).toHaveBeenCalledWith(204);
        });

        it('should return 404 when todo to delete is not found', async () => {
            // Mock request for deleting a non-existing todo
            mockRequest.params = { id: '999' };

            // Mock the TodoService deleteTodo to return false (todo not found)
            (TodoService.prototype.deleteTodo as jest.Mock).mockResolvedValue(false);

            // Call the controller method with the mock request and response
            await deleteTodo(mockRequest as Request, mockResponse as Response);

            // Assert that a 404 status is returned with the appropriate error message
            expect(responseStatus).toHaveBeenCalledWith(404);
            expect(responseJson).toHaveBeenCalledWith({ error: 'Todo not found' });
        });
    });
});
