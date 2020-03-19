import React, { Component } from "react";
import Joi from "joi-browser";
import Checkbox from "./Checkbox";
import { FaPlus } from "react-icons/fa";

import Input from "./Input";

class Form extends Component {
	state = {
		data: {},
		errors: {}
	};
	validate = () => {
		const options = { abortEarly: false };
		const { error } = Joi.validate(this.state.data, this.schema, options);

		if (!error) return null;
		const errors = {};
		for (let item of error.details) errors[item.path[0]] = item.message;

		return errors;
	};
	validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };
		const { error } = Joi.validate(obj, schema);
		return error ? error.details[0].message : null;
	};
	handleOnchange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		const data = { ...this.state.data };
		data[input.name] = input.value;
		this.setState({ data, errors });
	};

	handleCheckbox = () => {
		const data = { ...this.state.data };
		data.completed = !data.completed;

		this.setState({ data });
	};

	handleSubmit = e => {
		e.preventDefault();
		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;
		this.doSubmit();
	};

	renderCheckbox(label, type) {
		const { data } = this.state;
		return (
			<Checkbox
				type={type}
				defaultChecked={data.completed}
				onChange={this.handleCheckbox}
				label={label}
			/>
		);
	}

	renderInput(name, label, type = "text") {
		const { data, errors } = this.state;

		return (
			<Input
				name={name}
				value={data[name]}
				onChange={this.handleOnchange}
				error={errors[name]}
				type={type}
				label={label}
			/>
		);
	}

	renderButton() {
		return (
			<div className="form-group row">
				<div className="col-sm-10">
					<button
						disabled={this.validate()}
						type="submit"
						className="btn"
						style={{ backgroundColor: `#852eba` }}
					>
						<span>
							<FaPlus color="#fff" />
						</span>
					</button>
				</div>
			</div>
		);
	}
}

export default Form;
