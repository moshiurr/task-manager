const express = require("express");
require("dotenv").config();

require("./db/mongoose");
//above line ensures that mongoose.js file runs and we get connection to the database

const User = require("./models/user");
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

//get all user route

app.get("/users", (req, res) => {
	User.find({})
		.then(users => {
			res.send(users);
		})
		.catch(err => {
			res.status(500).send();
		});
});

//get individual user route
// :id is the dynamic variable provided by express

app.get("/users/:id", (req, res) => {
	const _id = req.params.id;

	User.findById(_id)
		.then(user => {
			if (!user) return res.status(404).send();

			res.send(user);
		})
		.catch(e => {
			res.status(500).send();
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

//get all tasks

app.get("/tasks", (req, res) => {
	Task.find({})
		.then(tasks => {
			res.send(tasks);
		})
		.catch(err => {
			res.status(500).send();
		});
});

//get individual task route
// :id is the dynamic variable provided by express
app.get("/tasks/:id", (req, res) => {
	const _id = req.params.id;

	Task.findById(_id)
		.then(task => {
			if (!task) return res.status(404).send();

			res.send(task);
		})
		.catch(err => {
			res.status(500).send();
		});
});

app.listen(port, () => {
	console.log("Server is up and running on port " + port);
});
