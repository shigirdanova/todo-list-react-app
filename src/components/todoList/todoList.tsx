import { Todo } from "../../services/api";
import { TodoItem } from "../todoItem/todoItem";
import styles from "./todoList.module.css";

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: (updatedTodo: Todo) => void;
  onDeleteTodo: (id: number) => void;
}

export function TodoList({ todos, onUpdateTodo, onDeleteTodo }: TodoListProps) {
  return (
    <div className={styles.listContainer}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdateTodo={onUpdateTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </div>
  );
}
