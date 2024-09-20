import { Priority } from "../../services/api";
import styles from "./todosFilter.module.css";

interface TodosFilterProps {
  value: Priority | "";
  onChange: (value: Priority) => void;
}

const priorities: Priority[] = ["low", "medium", "high"];

export function TodosFilter({ value, onChange }: TodosFilterProps) {
  return (
    <div className={styles.filterContainer}>
      <label htmlFor="priority-filter">Filter by priority:</label>
      <select
        id="priority-filter"
        value={value || ""}
        onChange={(event) => onChange(event.target.value as Priority)}
      >
        {priorities.map((p) => (
          <option value={p}>{p}</option>
        ))}
      </select>
    </div>
  );
}
