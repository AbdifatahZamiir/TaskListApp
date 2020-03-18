const mongoose = require("mongoose");
const Joi = require("joi");
const Todo = mongoose.model(
	"todo",
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 250
		},
		completed: {
			type: Boolean,
			required: true
		},
		date: { type: Date, default: Date.now },
		type: {
			type: String,
			required: true,
			minlength: 3,
			maxlength: 250
		}
	})
);
function validateTodos(todo) {
	const schema = {
		name: Joi.string()
			.min(3)
			.max(250)
			.required(),
		completed: Joi.bool().required(),
		type: Joi.string()
			.min(3)
			.max(250)
			.required()
	};

	return Joi.validate(todo, schema);
}
module.exports.Todo = Todo;
module.exports.validateTodos = validateTodos;
