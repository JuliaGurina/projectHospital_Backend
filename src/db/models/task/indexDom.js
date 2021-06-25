const mongoose = require("mongoose");

const { Schema } = mongoose;

const taskScheme = new Schema({
    name: String,
    doctor: String,
    date: String,
    lament: String,

});

module.exports = Task = mongoose.model("task", taskScheme);