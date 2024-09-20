import { useMemo } from "react";
import { Todo, Priority } from "../services/api";

export function useFilteredTodos(todos: Todo[], filterPriority: Priority | null) {
	return useMemo(() => {
	  return todos.filter((todo) => !filterPriority || todo.priority === filterPriority);
	}, [todos, filterPriority]);
}