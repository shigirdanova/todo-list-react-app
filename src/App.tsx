// App.tsx
import { useTodos } from "./hooks/useTodos";
import { TodoForm } from "./components/todoForm/todoForm";
import { TodoList } from "./components/todoList/todoList";
import { TodosFilter } from "./components/todosFilter/todosFilter";

import "./App.css";

function App() {
  const {
    todos,
    isLoading,
    error,
    onChangeFilter,
    onCreateTodo,
    onDeleteTodo,
    onUpdateTodo,
    filterPriority,
  } = useTodos();

  if (isLoading) {
    return <div>Loading todos...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onCreateTodo={onCreateTodo} />
      <TodosFilter
        filterPriority={filterPriority || ""}
        onChangeFilter={onChangeFilter}
      />
      <TodoList
        todos={todos}
        onUpdateTodo={onUpdateTodo}
        onDeleteTodo={onDeleteTodo}
      />
    </div>
  );
}

export default App;
