import mockData from "../data/mockData.json";

export type Priority = "low" | "medium" | "high";

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
}

let todos: Todo[] = mockData as Todo[];

const delay = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export const fetchTodos = async (): Promise<Todo[]> => {
  delay(500);
  return [...todos];
};

export const updateTodo = async (updatedTodo: Todo): Promise<Todo> => {
  delay(500);
  todos = todos.map((todo) =>
    todo.id === updatedTodo.id ? (todo = updatedTodo) : todo
  );
  return updatedTodo;
};

export const addTodo = async (
  newTodo: Omit<Todo, "id" | "completed">
): Promise<Todo> => {
  delay(500);
  const todo: Todo = { ...newTodo, id: Date.now(), completed: false };
  todos.push(todo);
  return todo;
};

export const deleteTodo = async (id: number): Promise<number> => {
  delay(500);
  todos.filter((todo) => todo.id === id);
  return id;
};
