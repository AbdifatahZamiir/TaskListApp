import React, { Component } from "react";
import config from "../config.json";
import "../App.css";
import { Link } from "react-router-dom";
import http from "../utils/httpServices";

class Done extends Component {
	state = {
		todos: []
	};

	async componentDidMount() {
		const { data: todos } = await http.get("http://localhost:5000/todos");
		const done = todos.filter(todo => todo.completed === true);
		this.setState({ todos: done });
	}

	handleDone = async todo => {
		const todos = [...this.state.todos];
		const index = todos.indexOf(todo);

		todos[index].completed = !todos[index].completed;
		const newTodos = todos.filter(todo => todo.completed === true);

		this.setState({ todos: newTodos });

		await http.put(`${config.apiUrl}/${todo._id}`, {
			name: todo.name,
			completed: todo.completed,
			type: todo.type
		});
	};

	handleDelete = async id => {
		const todos = this.state.todos.filter(todo => todo._id !== id);
		this.setState({ todos });

		await http.delete(`${config.apiUrl}/${id}`);
	};
	render() {
		const { todos } = this.state;

		return (
			<div className="container">
				<div className="mb-5 border-bottom pb-3">
					<h1>Completed Tasks</h1>
				</div>
				{todos.map(todo => {
					return (
						<div key={todo._id} className="row m-4 p-3 border">
							<div className="col-9">
								<span>
									<Link to={`/todos/${todo._id}`}>{todo.name}</Link>
								</span>
								<p>{new Date(todo.date).toString()}</p>
							</div>
							<div className="col-1">
								<button
									className="btn m-2"
									onClick={() => this.handleDone(todo)}
									style={{
										color: `white`,
										padding: `.5rem`,
										backgroundColor: `grey`
									}}
								>
									Undo
								</button>
							</div>
							<div className="col-1">
								<button
									className="btn m-2"
									onClick={() => this.handleDelete(todo._id)}
									style={{
										color: `white`,
										padding: `.5rem`,
										backgroundColor: `#FF756B`
									}}
								>
									Delete
								</button>
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}

export default Done;
