import React from "react";
import Joi from "joi-browser";
import config from "../config.json";
import "../App.css";
import Form from "./common/Form";
import { getTodo, saveTodo } from "../utils/fetchData";
import http from "../utils/httpServices";

class TodoForm extends Form {
	state = {
		data: {
			name: "",
			completed: undefined,
			category: ""
		},
		todos: [],
		errors: {}
	};
	async componentDidMount() {
		const { data: todos } = await http.get(config.apiUrl);
		this.setState({ todos });

		const todoId = this.props.match.params.id;
		if (todoId === "new") return;

		const todo = await getTodo(todoId);
		console.log(todo);

		this.setState({ data: this.mapToViewModel(todo) });
	}
	mapToViewModel = todo => {
		return {
			_id: todo._id,
			name: todo.name,
			completed: todo.completed,
			category: todo.type
		};
	};
	schema = {
		_id: Joi.string(),
		name: Joi.string()
			.required()
			.label("Title"),
		category: Joi.string()
			.required()
			.label("Category"),
		completed: Joi.bool()
			.required()
			.label("Completed")
	};

	doSubmit = async () => {
		const data = { ...this.state.data };
		await saveTodo(data);
		this.props.history.push("/todos");
	};
	render() {
		return (
			<div className="container ">
				<div className="mb-5 border-bottom pb-3">
					<h1>Add New Task</h1>
				</div>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("name", "Title")}
					{this.renderInput("category", "Category")}
					{this.renderCheckbox("Completed", "checkbox")}
					{this.renderButton()}
				</form>
			</div>
		);
	}
}

export default TodoForm;
