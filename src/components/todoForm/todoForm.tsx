import { useTodoForm } from "../../hooks/useTodoForm";
import { Todo } from "../../services/api";
import styles from "./todoForm.module.css";

export type TodoFormType = Omit<Todo, "id" | "completed">;

interface TodoFormProps {
  onCreateTodo: (newTodo: TodoFormType) => void;
}

export function TodoForm({ onCreateTodo }: TodoFormProps) {
  const { formData, handleChange, handleSubmit } = useTodoForm(onCreateTodo);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Create new todo</h3>
      <div className={styles.field}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter title"
        />
      </div>
      <div className={styles.field}>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
        />
      </div>
      <div className={styles.field}>
        <label>Priority:</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option key={"low"}>Low</option>
          <option key={"medium"}>Medium</option>
          <option key={"high"}>High</option>
        </select>
      </div>
      <button type="submit" className={styles.submitButton}>
        Save
      </button>
    </form>
  );
}
