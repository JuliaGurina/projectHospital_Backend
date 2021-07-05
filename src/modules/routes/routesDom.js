const express = require("express");
const router = express.Router();
const verificationUser = require('../../middleware/verification');

const {
	getAllTasks,
	createNewTask,
	deleteTask,
	changeTaskInfo
} = require("../controllers/dom.controller");

router.get("/allTasks", verificationUser, getAllTasks);
router.post("/createTask", verificationUser, createNewTask);
router.delete("/deleteTask", verificationUser, deleteTask);
router.patch("/updateTask", verificationUser, changeTaskInfo);

module.exports = router;