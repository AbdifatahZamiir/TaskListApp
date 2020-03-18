const express = require("express");
const mongoose = require("mongoose");
const { Todo, validateTodos } = require("../model/todo");
const asyncHandleError = require("../middleware/async");
const router = express.Router();

router.get(
	"/",
	asyncHandleError(async (req, res) => {
		const todos = await Todo.find();
		res.send(todos);
	})
);

router.post(
	"/",
	asyncHandleError(async (req, res) => {
		const { error } = validateTodos(req.body);

		if (error) return res.status(400).send(error.details[0].message);

		const todo = new Todo({
			name: req.body.name,
			completed: req.body.completed,
			type: req.body.type
		});

		await todo.save();
		res.send(todo);
	})
);

router.put(
	"/:id",
	asyncHandleError(async (req, res) => {
		if (mongoose.Types.ObjectId.isValid(req.params.id) === false)
			return res.status(400).send("Incorrect Id Format ");

		const { error } = validateTodos(req.body);

		if (error) return res.status(400).send(error.details[0].message);

		const todo = await Todo.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				name: req.body.name,
				completed: req.body.completed,
				type: req.body.type
			},
			{ new: true }
		);

		if (!todo)
			return res.status(404).send("Todo with the given id was not found");

		res.send(todo);
	})
);

router.delete(
	"/:id",
	asyncHandleError(async (req, res) => {
		if (mongoose.Types.ObjectId.isValid(req.params.id) === false)
			return res.status(400).send("Incorrect Id Format ");

		const todo = await Todo.findByIdAndRemove({ _id: req.params.id });

		if (!todo)
			return res.status(404).send("Todo with the given id was not found");

		res.send(todo);
	})
);

router.get(
	"/:id",
	asyncHandleError(async (req, res) => {
		if (mongoose.Types.ObjectId.isValid(req.params.id) === false)
			return res.status(400).send("Incorrect Id Format ");

		const todo = await Todo.findById(req.params.id);

		if (!todo)
			return res.status(404).send("Todo with the given id was not found");

		res.send(todo);
	})
);

module.exports = router;
