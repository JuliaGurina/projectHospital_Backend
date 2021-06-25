const Task = require("../../db/models/task/indexDom");

module.exports.getAllTasks = (req, res) => {
    Task.find().then((result) => {
        console.log({ data: result });
        res.send({ data: result });
    });
};

module.exports.createNewTask = (req, res) => {
    const { name, doctor, date, lament } = req.body;

    if (name &&
        doctor &&
        date &&
        lament) {
        try {
            const task = new Task(req.body);
            task.save().then((result) => {
                res.send({ data: result });
            });

        } catch (error) {
            res.status(401).json({
                message: 'Не все заполнены поля'
            })
        }

    } else {
        res.status(409).json({
            message: 'BlaBla'

        })
    }
};

module.exports.deleteTask = (req, res) => {
    Task.deleteOne(req.query).then((result) => {
        Task.find().then((result) => {
            res.send({ data: result });
        });
    });
};

module.exports.changeTaskInfo = (req, res) => {
    const { _id } = req.body;
    Task.updateOne({ _id }, req.body).then((result) => {
        Task.find().then((result) => {
            res.send({ data: result });
        });
    });
};