require("../src/db/mongoose");

const Task = require("../src/models/task");

// id to delete 6129b73b06a256cd1cc0ed58

Task.findByIdAndDelete("6129b73b06a256cd1cc0ed58")
	.then(res => {
		console.log(res);
		return Task.countDocuments({ completed: false });
	})
	.then(value => {
		console.log(value);
	})
	.catch(err => {
		console.log(err);
	});
