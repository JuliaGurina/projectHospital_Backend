const mongoose = require("mongoose");

const { Schema } = mongoose;

const taskScheme = new Schema({
	userId: String,
	name: String,
	doctor: String,
	date: String,
	lament: String,
});

module.exports = Task = mongoose.model("tasks", taskScheme);