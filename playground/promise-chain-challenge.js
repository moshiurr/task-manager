require("../src/db/mongoose");

const Task = require("../src/models/task");

// id to delete 6129b73b06a256cd1cc0ed58

// Task.findByIdAndDelete("6129b73b06a256cd1cc0ed58")
// 	.then(res => {
// 		console.log(res);
// 		return Task.countDocuments({ completed: false });
// 	})
// 	.then(value => {
// 		console.log(value);
// 	})
// 	.catch(err => {
// 		console.log(err);
// 	});

//async-await challenge

const deleteTaskAndCount = async (id) => {
	const task = await Task.findByIdAndDelete(id);
	const count = await Task.countDocuments({completed: false});
	return count;
}

// new ID: 612af97d46315d24c9114b21

deleteTaskAndCount("612af97d46315d24c9114b21").then((result) => {
	console.log(result);
}).catch(error=>{
	console.log(error);
});
