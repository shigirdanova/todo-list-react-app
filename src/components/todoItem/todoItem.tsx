import { Todo } from "../../services/api";
import styles from "./todoItem.module.css";

interface TodoItemProps {
  todo: Todo;
  onUpdateTodo: (updatedTodo: Todo) => void;
  onDeleteTodo: (id: number) => void;
}

export function TodoItem({ todo, onUpdateTodo, onDeleteTodo }: TodoItemProps) {
  const handleToggleCompleted = async () => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    onUpdateTodo(updatedTodo);
  };

  const handleDeleteTodo = async () => {
    onDeleteTodo(todo.id);
  };

  return (
    <div className={styles.todoContainer}>
      <label className={styles.todoLabel}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleCompleted}
        />
        {todo.title}
      </label>
      <button className={styles.deleteButton} onClick={handleDeleteTodo}>
        x
      </button>
    </div>
  );
}
