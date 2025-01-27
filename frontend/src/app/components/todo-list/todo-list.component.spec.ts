// Import required testing utilities for Angular components
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { TodoService } from '../../services/todo.service';
import { of } from 'rxjs';
import { ComponentStore } from '@ngrx/component-store';
import { TodoState } from '../../interfaces/todostate';

// Test suite for TodoListComponent functionality
describe('TodoListComponent', () => {
  // Component instance and testing utilities
  let component: TodoListComponent;
  let todoService: jasmine.SpyObj<TodoService>;
  let componentStore: ComponentStore<TodoState>;

  // Mock data for testing todos
  const mockTodos = [
    { id: 1, title: 'Test Todo 1', completed: false },
    { id: 2, title: 'Test Todo 2', completed: true }
  ];

  // Mock data for new todo creation
  const mockNewTodo = { id: 3, title: 'New Todo', completed: false };

  // Setup before each test
  beforeEach(async () => {
    // Create spy for TodoService with mock implementations
    const todoServiceSpy = jasmine.createSpyObj('TodoService', ['getTodos', 'createTodo']);
    todoServiceSpy.getTodos.and.returnValue(of(mockTodos));
    todoServiceSpy.createTodo.and.returnValue(of(mockNewTodo));

    // Configure testing module
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
      providers: [
        { provide: TodoService, useValue: todoServiceSpy },
        { provide: ComponentStore, useClass: ComponentStore<TodoState> }
      ]
    }).compileComponents();

    // Initialize component and services
    todoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
    componentStore = new ComponentStore<TodoState>({ todos: [], loading: false });
    component = new TodoListComponent(todoService, componentStore);
  });

  // Test updating a todo item
  it('should update todo', fakeAsync(() => {
    // Setup test data
    const todoToUpdate = mockTodos[0];
    const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
    todoService.updateTodo = jasmine.createSpy().and.returnValue(of(updatedTodo));

    // Initialize component
    component.ngOnInit();
    tick();

    // Execute update operation
    component.updateTodo(updatedTodo);
    tick();

    // Verify service call
    expect(todoService.updateTodo).toHaveBeenCalledWith(
      updatedTodo.id,
      updatedTodo as any
    );
  }));

  // Test removing a todo item
  it('should remove todo', fakeAsync(() => {
    // Setup
    const todoToRemove = mockTodos[0];
    todoService.deleteTodo = jasmine.createSpy().and.returnValue(of(void 0));

    // Initialize
    component.ngOnInit();
    tick();

    // Execute delete operation
    component.removeTodo(todoToRemove.id);
    tick();

    // Verify state updates
    let currentTodos: any[] = [];
    component.todos$.subscribe(todos => currentTodos = todos);
    tick();

    // Verify service call and state
    expect(todoService.deleteTodo).toHaveBeenCalledWith(todoToRemove.id);
    expect(currentTodos.length).toBe(mockTodos.length - 1);
    expect(currentTodos.find(t => t.id === todoToRemove.id)).toBeUndefined();
  }));

  // Test initial loading of todos
  it('should initialize with loading todos', fakeAsync(() => {
    component.ngOnInit();
    tick();

    let currentTodos = [];
    component.todos$.subscribe(todos => { currentTodos = todos; });

    expect(todoService.getTodos).toHaveBeenCalled();
    expect(currentTodos.length).toBe(2);
  }));

  // Test adding a new todo
  it('should add new todo', fakeAsync(() => {
    component.newTodoTitle = 'New Todo';
    component.addTodo();
    tick();

    expect(todoService.createTodo).toHaveBeenCalled();
  }));
});