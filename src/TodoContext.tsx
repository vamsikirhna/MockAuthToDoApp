import React, { createContext, useState, ReactNode } from 'react';

// Define the Todo interface
interface Todo {
    id: string;
    title: string;
    description?: string;
    dueDate?: Date;
    status: 'pending' | 'completed';
}

// Define the context type
type TodoContextType = {
    todos: Todo[];
    addTodo: (todo: Omit<Todo, 'id' | 'status'>) => void;
    editTodo: (id: string, updatedTodo: Partial<Todo>) => void;
    deleteTodo: (id: string) => void;
    toggleStatus: (id: string) => void;
};

// Create the context
export const TodoContext = createContext<TodoContextType | undefined>(undefined);

// TodoProvider component
export const TodoProvider = ({ children }: { children: ReactNode }) => {
    // Initialize todos state with default value
    const [todos, setTodos] = useState<Todo[]>([
        {
            id: '1',
            title: "Title",
            description: "Random Desc",
            dueDate: new Date(),
            status: 'pending',
        },
    ]);

    // Add a new todo
    const addTodo = (todo: Omit<Todo, 'id' | 'status'>) => {
        const newTodo: Todo = {
            ...todo,
            id: Date.now().toString(),
            status: 'pending',
        };
        setTodos((prev) => [...prev, newTodo]);
    };

    // Edit an existing todo
    const editTodo = (id: string, updatedTodo: Partial<Todo>) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, ...updatedTodo } : todo
            )
        );
    };

    // Delete a todo
    const deleteTodo = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    // Toggle the status of a todo between 'pending' and 'completed'
    const toggleStatus = (id: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id
                    ? { ...todo, status: todo.status === 'pending' ? 'completed' : 'pending' }
                    : todo
            )
        );
    };

    // Provide the context to children
    return (
        <TodoContext.Provider
            value={{ todos, addTodo, editTodo, deleteTodo, toggleStatus }}
        >
            {children}
        </TodoContext.Provider>
    );
};
