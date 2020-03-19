import axios from "axios";
import config from "../config.json";

export async function getTodo(todoId) {
	const { data: todo } = await axios.get(`${config.apiUrl}/${todoId}`);

	if (!todo) return this.props.history.replace("/not-found");
	return todo;
}

export async function saveTodo(todo) {
	const { data: todos } = await axios.get(config.apiUrl);
	let todoInDb = todos.find(m => m._id === todo._id) || {};

	todoInDb.name = todo.name;
	todoInDb.type = todo.category;
	todoInDb.completed = todo.completed;

	if (!todoInDb._id) {
		await axios.post(config.apiUrl, {
			name: todo.name,
			completed: todo.completed,
			type: todo.category
		});
	} else {
		await axios.put(`${config.apiUrl}/${todo._id}`, {
			name: todo.name,
			completed: todo.completed,
			type: todo.category
		});
	}
}
