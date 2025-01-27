import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../interfaces/todo';
import { TodoState } from '../../interfaces/todostate';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';

// TodoListComponent: Manages the todo list functionality
// - Displays list of todos
// - Handles adding, updating, and deleting todos
// - Manages loading states and error handling
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  providers: [TodoService, ComponentStore]
})
export class TodoListComponent implements OnInit {
  // Observable streams for todos and loading state
  todos$!: Observable<Todo[]>;
  loading$!: Observable<boolean>;

  // Tracks the ID of todo being edited
  editingId: number | null = null;

  // Form input for new todo title
  newTodoTitle = '';

  // Declare the updaters as private fields
  private setLoading: (loading: boolean) => void;
  private setTodos: (todos: Todo[]) => void;
  private addTodoToState: (todo: Todo) => void;
  private updateTodoInState: (todo: Todo) => void;
  private deleteTodoFromState: (todoId: number) => void;

  // Initialize component with TodoService and ComponentStore
  constructor(private todoService: TodoService, private store: ComponentStore<TodoState>) {

    // Initialize store with empty state
    this.store.setState({
      todos: [],
      loading: false
    });

    // Set up observable streams
    this.todos$ = this.store.select(state => state.todos);
    this.loading$ = this.store.select(state => state.loading);

    // Initialize store updaters
    this.setLoading = this.store.updater((state, loading: boolean) => ({
      ...state,
      loading
    }));

    // Set todos list in store
    this.setTodos = this.store.updater((state, todos: Todo[]) => {
      return { ...state, todos };
    });

    // Adds new todo to store
    this.addTodoToState = this.store.updater((state, todo: Todo) => {
      return { ...state, todos: [...state.todos, todo] };
    });

    // Updates todos list in store
    this.updateTodoInState = this.store.updater((state, updatedTodo: Todo) => ({
      ...state,
      todos: state.todos.map(todo =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
    }));

    // Removes todo from store
    this.deleteTodoFromState = this.store.updater((state, todoId: number) => ({
      ...state,
      todos: state.todos.filter(todo => todo.id !== todoId)
    }));
  }

  // Component lifecycle initialization and data loading
  ngOnInit() {
    this.loadTodos();
  }

  // Loads todos from service
  loadTodos() {
    this.setLoading(true);
    this.todoService.getTodos()
      .subscribe({
        next: (todos) => {
          this.setTodos(todos);
          this.setLoading(false);
        },
        error: (error) => {
          console.error('Error loading todos:', error);
          alert('Error loading todos');
          this.setLoading(false);
        }
      });
  }

  // Adds new todo item
  addTodo() {
    if (this.newTodoTitle.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        title: this.newTodoTitle.trim(),
        completed: false
      };

      this.todoService.createTodo(newTodo).subscribe({
        next: (todo) => {
          this.addTodoToState(todo);
          this.newTodoTitle = '';
        },
        error: (error) => {
          console.error('Error adding todo:', error);
          alert('Error adding todo');
        }
      });
    } else {
      alert('Title is required');
    }
  }

  // Updates existing todo
  updateTodo(todo: Todo): void {
    if (!todo.title.trim()) {
      alert('Title is required');
      return;
    }
    if (todo.id) {
      this.todoService.updateTodo(todo.id, todo).subscribe({
        next: (updatedTodo) => {
          this.updateTodoInState(updatedTodo);
          this.editingId = null;
        },
        error: (error) => {
          console.error('Error updating todo:', error);
          alert('Error updating todo');
        }
      });
    }
  }

  // Removes todo item
  removeTodo(todoId: number): void {
    this.todoService.deleteTodo(todoId).subscribe({
      next: () => {
        this.deleteTodoFromState(todoId);
      },
      error: (error) => {
        console.error('Error deleting todo:', error);
        alert('Error deleting todo');
      }
    });
  }

}