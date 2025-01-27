import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/api/todos'; // Base URL for the API

  constructor(private http: HttpClient) { }

  /**
   * Fetches all todos from the API.
   * @returns An Observable of an array of Todo items.
   */
  getTodos(): Observable<Todo[]> {
    console.log('Get Todos from API in TodoService');
    return this.http.get<Todo[]>(this.apiUrl);
  }

  /**
   * Fetches a single todo by its ID from the API.
   * @param id - The ID of the todo to fetch.
   * @returns An Observable of the Todo item.
   */
  getTodo(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }

  /**
   * Creates a new todo via the API.
   * @param todo - The Todo item to create.
   * @returns An Observable of the created Todo item.
   */
  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  /**
   * Updates an existing todo via the API.
   * @param id - The ID of the todo to update.
   * @param todo - The updated Todo item.
   * @returns An Observable of the updated Todo item.
   */
  updateTodo(id: number, todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, todo);
  }

  /**
   * Deletes a todo by its ID via the API.
   * @param id - The ID of the todo to delete.
   * @returns An Observable of void.
   */
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}