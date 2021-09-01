const express = require("express");
require("dotenv").config();

require("./db/mongoose");
//above line ensures that mongoose.js file runs and we get connection to the database


const app = express();

const port = process.env.PORT || 3000;

//automatically convert express requests to JSON objects
app.use(express.json());


///////////////////////////////////////////////////////
////attaching the user router from another file////////
///////////////////////////////////////////////////////

const userRouter = require('./routers/user-router')

app.use(userRouter);

///////////////////////////////////////////////////////
////attaching the task router from another file////////
///////////////////////////////////////////////////////

const taskRouter = require('./routers/task-router')

app.use(taskRouter);


app.listen(port, () => {
	console.log("Server is up and running on port " + port);
});


/////////////////////////////////
/// Testing bcryptJS/////////////

const bcrypt = require('bcryptjs')

const myFunc = async () =>{
	const password = "ABc1234!";

	const hashedPassword = await bcrypt.hash(password, 8);

	console.log(password);
	console.log(hashedPassword);

	const isMatch = await bcrypt.compare("ABC1234!", hashedPassword);
	console.log(isMatch)
}

myFunc();


