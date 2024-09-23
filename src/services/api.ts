import mockData from "../data/mockData.json";

export type Priority = "low" | "medium" | "high";

export const PRIORITY_VALUES: Priority[] = ["low", "medium", "high"];

export type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
}

const TODOS_STORAGE_KEY = "todos"
  
const readTodosFromStorage = (): Todo[] => {
  const data = localStorage.getItem(TODOS_STORAGE_KEY);
  if (data) {
    return JSON.parse(data);
  } else {
    writeTodosToStorage(mockData);
    return mockData as Todo[];
  }
};

const writeTodosToStorage = (todos: any) => {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
};

export async function fetchTodos(): Promise<Todo[]> {
  return new Promise((resolve) => {
    const todos = readTodosFromStorage();
    setTimeout(() => resolve(todos), 500); 
  });
}


export async function addTodo(newTodo: Omit<Todo, "id" | "completed">): Promise<Todo> {
  return new Promise((resolve) => {
    const todos = readTodosFromStorage();
    const todo: Todo = { ...newTodo, id: Date.now(), completed: false };
    todos.push(todo);
    writeTodosToStorage(todos);
    setTimeout(() => resolve(todo), 500);
  });
}

export async function updateTodo(updatedTodo: Todo): Promise<void> {
  return new Promise((resolve) => {
    const todos = readTodosFromStorage();
    const updatedTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    writeTodosToStorage(updatedTodos);
    setTimeout(() => resolve(), 500);
  });
}

export async function deleteTodo(todoId: number): Promise<void> {
  return new Promise((resolve) => {
    const todos = readTodosFromStorage();
    const filteredTodos = todos.filter((todo) => todo.id !== todoId);
    writeTodosToStorage(filteredTodos);
    setTimeout(() => resolve(), 500);
  });
}

// let todos: Todo[] = mockData as Todo[];

// const delay = (time: number) =>
//   new Promise((resolve) => setTimeout(resolve, time));


// export const fetchTodos = async (): Promise<Todo[]> => {
//   await delay(500);
//   return [...todos];
// };

// export const updateTodo = async (updatedTodo: Todo): Promise<Todo> => {
//   await delay(500);
//   todos = todos.map((todo) =>
//     todo.id === updatedTodo.id ? (todo = updatedTodo) : todo
//   );
//   return updatedTodo;
// };

// export const addTodo = async (
//   newTodo: Omit<Todo, "id" | "completed">
// ): Promise<Todo> => {
//   await delay(500);
//   const todo: Todo = { ...newTodo, id: Date.now(), completed: false };
//   todos.push(todo);
//   return todo;
// };

// export const deleteTodo = async (id: number): Promise<number> => {
//   await delay(500);
//   todos.filter((todo) => todo.id === id);
//   return id;
// };
