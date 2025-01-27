import { Todo } from './todo';

/**
 * Interface representing the state of the Todo application.
 */
export interface TodoState {
    /**
     * Array of Todo items.
     */
    todos: Todo[];

    /**
     * Indicates whether the application is currently loading data.
     */
    loading: boolean;
}