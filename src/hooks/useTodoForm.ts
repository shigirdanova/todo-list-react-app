import { useState } from "react";
import { Priority } from "../services/api";
import { TodoFormType } from "../components/todoForm/todoForm";

export function useTodoForm(onCreateTodo: (newTodo: TodoFormType) => void) {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		priority: "medium" as Priority,
	  });
	
	  const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	  ) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
		  ...prevData,
		  [name]: value,
		}));
	  };
	
	  const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onCreateTodo(formData);
	  };
	
	  return { formData, handleChange, handleSubmit}
}
