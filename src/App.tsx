import { useState } from "react";
import "./App.css";
import { Priority } from "./services/api";
import { TodoList } from "./components/todoList/todoList";
import { TodosFilter } from "./components/todosFilter/todosFilter";
import { TodoForm } from "./components/todoForm/todoForm";
import { useTodos } from "./hooks/useTodos";
import { useFilteredTodos } from "./hooks/useFilteredTodos";

function App() {
  const [filterPriority, setFilterPriority] = useState<Priority | null>(null);
  const {
    todos,
    isLoading,
    error,
    handleCreateTodo,
    handleUpdateTodo,
    handleDeleteTodo,
  } = useTodos();
  const filteredTodos = useFilteredTodos(todos, filterPriority);

  if (isLoading) {
    return <div>Loading todos...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onCreateTodo={handleCreateTodo} />
      <TodosFilter value={filterPriority || ""} onChange={setFilterPriority} />
      <TodoList
        todos={filteredTodos}
        onUpdateTodo={handleUpdateTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
}

export default App;
