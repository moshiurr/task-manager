const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,

		//email validation using Validator package
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Invalid email");
			}
		},
	},
	age: {
		type: Number,
		default: 0,

		//number validation using built-in validators
		validate(value) {
			if (value < 0) throw new Error("Age must be a positive number");
		},
	},

	password: {
		type: String,
		required: true,
		trim: true,

		//plain password validation using validators package
		validate(value) {
			if (value.length < 6)
				throw new Error("Password has to be greater than 6 characters");
			else if (value.toLowerCase() === "password")
				throw new Error("Password can not be obvious");
		},
	},
});

module.exports = User;
