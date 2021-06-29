const Task = require("../../db/models/task/indexDom");

module.exports.getAllTasks = (req, res) => {
    try {
        Task.find({
            userId: req.user.userId
        }).then((result) => {
            res.send({ data: result });
        });
    } catch (error) {
        res.status(401).json({
            message: 'error'
        })
    };
}

module.exports.createNewTask = (req, res) => {
    const { name, doctor, date, lament } = req.body;

    try {
        const task = new Task(req.body);
        task.userId = req.user.userId;
        task.save().then((result) => {
            Task.find({
                userId: req.user.userId
            }).then(result => {
                res.send({ data: result });
            })
        });

    } catch (error) {
        res.status(401).json({
            message: 'Не все заполнены поля'
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
