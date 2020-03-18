const express = require("express");
const config = require("config");
const debug = require("debug")("db:debug");
const enableCors = require("./middleware/enableCors");
const mongoose = require("mongoose");
const todos = require("./routes/todos");

const app = express();
const dbConfig = config.get("Todo.dbConfig.host");
mongoose
	.connect(dbConfig, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
	.then(() => debug("Connected to database"))
	.catch(ex => debug("Not connected", ex));

app.use(express.json());
app.use(enableCors);
app.use("/todos", todos);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running ${port}`));
