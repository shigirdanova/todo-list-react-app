import { useEffect, useMemo, useState } from "react";
import "./App.css";
import {
  Priority,
  Todo,
  addTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from "./services/api";
import { TodoList } from "./components/todoList/todoList";
import { TodosFilter } from "./components/todosFilter/todosFilter";
import { TodoForm, TodoFormType } from "./components/todoForm/todoForm";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [filterPriority, setFilterPriority] = useState<Priority | null>(null);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (error) {
        console.log("Error", error);
      } finally {
        setLoading(false);
      }
    };

    getTodos();
  }, []);

  const handleOnUpdateTodo = async (updatedTodo: Todo) => {
    try {
      await updateTodo(updatedTodo);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        )
      );
    } catch (error) {
      console.error("Error updating:", error);
      setError(error as Error);
    }
  };

  const handleOnDeleteTodo = async (deletedTodoId: number) => {
    try {
      await deleteTodo(deletedTodoId);
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== deletedTodoId)
      );
    } catch (error) {
      console.error("Error deleting:", error);
      setError(error as Error);
    }
  };

  const handleOnCreateTodo = async (formData: TodoFormType) => {
    try {
      const newTodo = await addTodo(formData);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error("Error adding new todo:", error);
      setError(error as Error);
    }
  };

  const filterTodos = (todos: Todo[], filterPriority: Priority | null) => {
    return todos.filter((todo) => {
      return !filterPriority || todo.priority === filterPriority;
    });
  };

  const filteredTodos = useMemo(() => {
    return filterTodos(todos, filterPriority);
  }, [todos, filterPriority]);

  if (isLoading) {
    return <div>Loading todos...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onCreateTodo={handleOnCreateTodo} />
      <TodosFilter value={filterPriority || ""} onChange={setFilterPriority} />
      <TodoList
        todos={filteredTodos}
        onUpdateTodo={handleOnUpdateTodo}
        onDeleteTodo={handleOnDeleteTodo}
      />
    </div>
  );
}

export default App;
