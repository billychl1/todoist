/**
 * Interface representing a Todo item.
 */
export interface Todo {
    /**
     * Unique identifier for the todo item.
     */
    id: number;

    /**
     * Title or name of the todo item.
     */
    title: string;

    /**
     * Optional description providing more details about the todo item.
     */
    description?: string;

    /**
     * Indicates whether the todo item is completed.
     */
    completed: boolean;

    /**
     * Timestamp indicating when the todo item was created.
     */
    createdAt?: Date;

    /**
     * Timestamp indicating when the todo item was last updated.
     */
    updatedAt?: Date; 
}