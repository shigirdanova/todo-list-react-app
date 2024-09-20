import { useEffect, useState } from "react";
import { TodoFormType } from "../components/todoForm/todoForm";
import { fetchTodos, Todo, updateTodo, deleteTodo, addTodo } from "../services/api";

export function useTodos() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [isLoading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const getTodos = async () => {
		  try {
			const data = await fetchTodos();
			setTodos(data);
		  } catch (error) {
			console.log("Error", error);
		  } finally {
			setLoading(false);
		  }
		};
	
		getTodos();
	  }, []);
	
	  const handleCreateTodo = async (formData: TodoFormType) => {
		try {
		  const newTodo = await addTodo(formData);
		  setTodos((prevTodos) => [...prevTodos, newTodo]);
		} catch (error) {
		  console.error("Error adding new todo:", error);
		  setError(error as Error);
		}
	  };

	  const handleUpdateTodo = async (updatedTodo: Todo) => {
		try {
		  await updateTodo(updatedTodo);
		  setTodos((prevTodos) =>
			prevTodos.map((todo) =>
			  todo.id === updatedTodo.id ? updatedTodo : todo
			)
		  );
		} catch (error) {
		  console.error("Error updating:", error);
		  setError(error as Error);
		}
	  };
	
	  const handleDeleteTodo = async (deletedTodoId: number) => {
		try {
		  await deleteTodo(deletedTodoId);
		  setTodos((prevTodos) =>
			prevTodos.filter((todo) => todo.id !== deletedTodoId)
		  );
		} catch (error) {
		  console.error("Error deleting:", error);
		  setError(error as Error);
		}
	  };

	  return {
		todos, 
		isLoading, 
		error, 
		handleUpdateTodo, 
		handleCreateTodo,
		handleDeleteTodo
	  }
}