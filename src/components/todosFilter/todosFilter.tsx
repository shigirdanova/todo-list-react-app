import { PRIORITY_VALUES, Priority } from "../../services/api";
import styles from "./todosFilter.module.css";

export interface TodosFilterProps {
  filterPriority: Priority | "";
  onChangeFilter: (value: Priority) => void;
}

export function TodosFilter({
  filterPriority,
  onChangeFilter,
}: TodosFilterProps) {
  return (
    <div className={styles.filterContainer}>
      <label htmlFor="priority-filter">Filter by priority:</label>
      <select
        id="priority-filter"
        value={filterPriority || ""}
        onChange={(event) => onChangeFilter(event.target.value as Priority)}
      >
        {PRIORITY_VALUES.map((priority) => (
          <option value={priority}>{priority}</option>
        ))}
      </select>
    </div>
  );
}
