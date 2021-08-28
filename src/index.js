const express = require("express");
require("dotenv").config();

require("./db/mongoose");
//above line ensures that mongoose.js file runs and we get connection to the database

const User = require("./models/user");
const Taks = require("./models/task");
const Task = require("./models/task");

const app = express();

const port = process.env.PORT || 3000;

//automatically convert express requests to JSON objects
app.use(express.json());

app.post("/users", (req, res) => {
	//connecting to the User Schema
	const user = new User(req.body);

	user
		.save()
		.then(() => {
			res.status(201).send(user);
		})
		.catch(e => {
			res.status(400).send(e.message);
		});
});

app.post("/tasks", (req, res) => {
	const task = new Task(req.body);

	task
		.save()
		.then(() => {
			res.status(201).send(task);
		})
		.catch(e => {
			res.status(400).send(e.message);
		});
});

app.listen(port, () => {
	console.log("Server is up and running on port " + port);
});
