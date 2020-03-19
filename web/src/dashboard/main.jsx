import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Todos from "../components/todos";
import Form from "../components/todoForm";
import Done from "../components/done";
import NotFound from "../components/not-found";

const Dashboard = () => {
	return (
		<main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
			<Switch>
				<Route path="/todos/:id" component={Form} />
				<Route path="/todos" component={Todos} />
				<Route path="/done" component={Done} />
				<Redirect from="/" exact to="/todos" />
				<Route path="/not-found" component={NotFound} />
				<Redirect to="/not-found" />
			</Switch>
		</main>
	);
};

export default Dashboard;
