require("../src/db/mongoose");

const User = require("../src/models/user");

// 6129b40f19a540b665375a80

User.findByIdAndUpdate("6129b40f19a540b665375a80", { age: 20 })
	.then(user => {
		console.log(user);
		return User.countDocuments({ age: 20 });
	})
	.then(result => {
		console.log(result);
	})
	.catch(error => {
		console.log(error);
	});
