require("../src/db/mongoose");

const User = require("../src/models/user");

// 6129b40f19a540b665375a80

// User.findByIdAndUpdate("6129b40f19a540b665375a80", { age: 20 })
// 	.then(user => {
// 		console.log(user);
// 		return User.countDocuments({ age: 20 });
// 	})
// 	.then(result => {
// 		console.log(result);
// 	})
// 	.catch(error => {
// 		console.log(error);
// 	});

//exact same funcionality as above but with async functions

const updateAndCount = async (id, age) =>{
	const user = await User.findByIdAndUpdate(id,{age: age});
	//if the variable name is same as the property name then we can do the following short hand techniques:
	const count = await User.countDocuments({ age });

	return {
		user: user,
		count: count,
	};
}


updateAndCount("6129b40f19a540b665375a80", 2).then(result => {
	console.log(result);
}).catch(error => {
	console.log(error);
})
