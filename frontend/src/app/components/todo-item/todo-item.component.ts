import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Todo } from '../../interfaces/todo';
import { TodoService } from '../../services/todo.service';

// TodoItemComponent: Handles individual todo item display and interactions
// - Displays todo item details
// - Handles edit mode toggle
// - Manages completion status
// - Emits events for parent component actions
@Component({
  selector: 'app-todo-item',
  imports: [CommonModule, FormsModule, MatSlideToggleModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  @Input() todo!: Todo; // Input property to receive a todo item
  @Input() isEditing = false; // Input property to indicate if the item is in edit mode
  @Output() edit = new EventEmitter<Todo>(); // Output event emitter for editing a todo
  @Output() todoDeleted = new EventEmitter<number>(); // Output event emitter for deleting a todo
  @Output() toggleComplete = new EventEmitter<Todo>(); // Output event emitter for toggling completion status
  @Output() cancelEditMode = new EventEmitter<void>(); // Output event emitter for canceling edit mode

  constructor(private todoService: TodoService) { }

  editedTodo: Todo = { id: 0, title: '', description: '', completed: false }; // Temporary storage for the edited todo

  // Toggles the completion status of the todo item.
  onToggleComplete(): void {
    const updatedTodo = {
      ...this.todo,
      completed: !this.todo.completed
    };
    this.toggleComplete.emit(updatedTodo);
  }

  //Initiates the edit mode for the todo item.
  startEdit(): void {
    this.isEditing = true;
    this.editedTodo = { ...this.todo };
  }

  // Saves the changes made to the todo item.
  saveEdit(): void {
    const updatedTodo = {
      ...this.editedTodo,
      updatedAt: new Date()
    };
    this.edit.emit(updatedTodo);
    this.isEditing = false;
  }

  // Cancels the edit mode without saving changes.
  cancelEdit(): void {
    this.isEditing = false;
    this.cancelEditMode.emit();
  }

  // Deletes the todo item after confirmation.
  onDelete(): void {
    if (this.todo.id) {
      if (window.confirm('Confirm to delete this item?')) {
        this.todoDeleted.emit(this.todo.id);
      }
    }
  }
}