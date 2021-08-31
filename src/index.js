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

app.post("/users", async (req, res) => {
	//connecting to the User Schema
	const user = new User(req.body);

	//using Aysnc-Await ps: make sure to make the function 'async'
	try{
		await user.save();
		res.status(201).send(user);
	}catch(err){
		res.status(400).send(err);
	}

	//Using promise chainnig

	// user
	// 	.save()
	// 	.then(() => {
	// 		res.status(201).send(user);
	// 	})
	// 	.catch(e => {
	// 		res.status(400).send(e.message);
	// 	});
});

//get all user route

app.get("/users", async (req, res) => {

	//Using Async-Await 
	try {
		const users = await User.find({});
		res.status(200).send(users);
	}catch(err) {
		res.status(400).send(err);
	}


	//Using promise chainnig

	// User.find({})
	// 	.then(users => {
	// 		res.send(users);
	// 	})
	// 	.catch(err => {
	// 		res.status(500).send();
	// 	});
});

//get individual user route
// :id is the dynamic variable provided by express

app.get("/users/:id", async (req, res) => {
	const _id = req.params.id;

	//Using Async-Await

	try{
		const user = await User.findById(_id);
		if(!user) return res.status(404).send();
		res.send(user);
	}catch(err) {
		res.status(500).send(err);
	}


	//Using promise chainnig

	// User.findById(_id)
	// 	.then(user => {
	// 		if (!user) return res.status(404).send();

	// 		res.send(user);
	// 	})
	// 	.catch(e => {
	// 		res.status(500).send();
	// 	});
});

//delete user route

app.delete('/users/:id', async (req, res) => {
	
	try{
		const user = await User.findByIdAndDelete(req.params.id);

		if(!user) return res.status(404).send();

		res.send(user);
	}catch(e){
		res.status(500).send(e);
	}
})

app.post("/tasks", async (req, res) => {
	const task = new Task(req.body);

	try {
		await task.save();
		res.status(201).send(task);
	}catch(err) {
		res.status(400).send(err);
	}


	// task
	// 	.save()
	// 	.then(() => {
	// 		res.status(201).send(task);
	// 	})
	// 	.catch(e => {
	// 		res.status(400).send(e.message);
	// 	});
});

//get all tasks

app.get("/tasks", async (req, res) => {

	try{
		const tasks = await Task.find({});
		res.status(200).send(tasks);
	}catch(e){
		res.status(500).send();
	}

	// Task.find({})
	// 	.then(tasks => {
	// 		res.send(tasks);
	// 	})
	// 	.catch(err => {
	// 		res.status(500).send();
	// 	});
});

//get individual task route
// :id is the dynamic variable provided by express
app.get("/tasks/:id", async (req, res) => {
	const _id = req.params.id;

	try{
		const task = await Task.findById(_id);
		if(!task){
			res.status(404).send();
		}
		res.send(task);
	}catch(err) {
		res.status(500).send();
	}

	// Task.findById(_id)
	// 	.then(task => {
	// 		if (!task) return res.status(404).send();

	// 		res.send(task);
	// 	})
	// 	.catch(err => {
	// 		res.status(500).send();
	// 	});
});

//delete task route

app.delete('/tasks/:id', async (req, res) => {
	try{
		const task = await Task.findByIdAndDelete(req.params.id);

		if(!task) return res.status(404).send();

		res.send(task);
	}catch(e){
		res.status(500).send(e);
	}
})

app.listen(port, () => {
	console.log("Server is up and running on port " + port);
});
