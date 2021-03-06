const express = require("express");
const router = new express.Router();

const User = require("../models/user");

/////////////////////////////////
//all routes releated to USERS//
///////////////////////////////

router.post("/users", async (req, res) => {
	//connecting to the User Schema
	const user = new User(req.body);

	//using Aysnc-Await ps: make sure to make the function 'async'
	try {
		await user.save();
		res.status(201).send(user);
	} catch (err) {
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

//route for logging in

router.post("/users/login", async (req, res) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);

		res.send(user);
	} catch (e) {
		res.status(400).send();
	}
});

//get all user route

router.get("/users", async (req, res) => {
	//Using Async-Await
	try {
		const users = await User.find({});
		res.status(200).send(users);
	} catch (err) {
		res.status(400).send(err);
	}
});

//get individual user route
// :id is the dynamic variable provided by express

router.get("/users/:id", async (req, res) => {
	const _id = req.params.id;

	//Using Async-Await

	try {
		const user = await User.findById(_id);
		if (!user) return res.status(404).send();
		res.send(user);
	} catch (err) {
		res.status(500).send(err);
	}
});

//update route for user

router.patch("/users/:id", async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["name", "email", "password", "age"];

	const isValidOperation = updates.every(update =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation)
		return res.status(400).send({ error: "Invalid updates" });

	try {
		const user = await User.findById(req.params.id);

		updates.forEach(update => {
			user[update] = req.body[update];
		});

		await user.save();

		//below commented code is not in use

		//const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
		// the third param {new: true} is for getting the updated new user, not the user it find first
		// runValidators make sure every property is valid

		if (!user) return res.status(404).send();

		res.send(user);
	} catch (e) {
		res.status(500).send(e);
	}
});

//delete user route

router.delete("/users/:id", async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);

		if (!user) return res.status(404).send();

		res.send(user);
	} catch (e) {
		res.status(400).send(e);
	}
});

module.exports = router;
