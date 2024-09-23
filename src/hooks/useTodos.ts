import { useState, useEffect, useMemo } from "react";
import { Todo, fetchTodos, addTodo, updateTodo, deleteTodo, Priority } from "../services/api";
import { TodoListProps } from "../components/todoList/todoList";
import { TodoFormProps } from "../components/todoForm/todoForm";
import { TodosFilterProps } from "../components/todosFilter/todosFilter";

export interface UseTodosProps extends TodoListProps, TodoFormProps, TodosFilterProps {
  isLoading: boolean;
  error: Error | null;
}

export function useTodos(): UseTodosProps {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [filterPriority, setFilterPriority] = useState<Priority | "">("");

  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    getTodos();
  }, []);

  const handleCreateTodo = async (newTodo: Omit<Todo, "id" | "completed">) => {
    try {
      const addedTodo = await addTodo(newTodo);
      setTodos([...todos, addedTodo]);
    } catch (err) {
      setError(err as Error);
    }
  };

  const handleUpdateTodo = async (updatedTodo: Todo) => {
    try {
      await updateTodo(updatedTodo);
      setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
    } catch (err) {
      setError(err as Error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err as Error);
    }
  };

  const filteredTodos = useMemo(() => {
    if (!filterPriority) return todos;
    return todos.filter((todo) => todo.priority === filterPriority);
  }, [todos, filterPriority]);

  return {
    todos: filteredTodos,
    isLoading,
    error,
	filterPriority, 
    onCreateTodo: handleCreateTodo,
    onUpdateTodo: handleUpdateTodo,
    onDeleteTodo: handleDeleteTodo,
    onChangeFilter: setFilterPriority,
  };
}