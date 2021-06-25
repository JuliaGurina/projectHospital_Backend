const express = require("express");
const router = express.Router();

const {
    getAllTasks,
    createNewTask,
    deleteTask,
    changeTaskInfo
} = require("../controllers/dom.controller");

router.get("/allTasks", getAllTasks);
router.post("/createTask", createNewTask);
router.delete("/deleteTask", deleteTask);
router.patch("/updateTask", changeTaskInfo);

module.exports = router;