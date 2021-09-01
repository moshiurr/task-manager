const express = require('express');
const router = new express.Router();

const Task = require("../models/task");

/////////////////////////////////
//all routes releated to TASKS//
///////////////////////////////

router.post("/tasks", async (req, res) => {
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

router.get("/tasks", async (req, res) => {

	try{
		const tasks = await Task.find({});
		res.status(200).send(tasks);
	}catch(e){
		res.status(500).send();
	}
});

//get individual task route
// :id is the dynamic variable provided by express
router.get("/tasks/:id", async (req, res) => {
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

});

//upadte Task routes.

router.patch("/tasks/:id", async (req, res) => {

	const updates = Object.keys(req.body);
	const allowedUpdates = ['description', 'completed'];

	const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

	if(!isValidOperation) return res.status(400).send({error: 'Invalid updates'})


	try {
		const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
		//Look at user patch route for explaination for third params

		if(!task) return res.status(404).send();
		
		res.send(task)
		
	}catch(e){
		res.status(400).send(e);
	}
});

//delete task route

router.delete('/tasks/:id', async (req, res) => {
	try{
		const task = await Task.findByIdAndDelete(req.params.id);

		if(!task) return res.status(404).send();

		res.send(task);
	}catch(e){
		res.status(500).send(e);
	}
})

module.exports = router;
