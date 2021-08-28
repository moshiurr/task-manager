const mongoose = require("mongoose");

require("dotenv").config();

const uri = process.env.MONGOOSE_URI;

mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
