const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
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


//this is a mongoose middleware that handles the hashing of passwords every time password field is modified

userSchema.pre('save', async function(next){
	const user = this;

	if(user.isModified('password')){
		user.password = await bcrypt.hash(user.password, 8);
	}

	//this next param is to make sure that this functions end, otherwise this func will stuck forever thinking it has finished it execution
	next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;
