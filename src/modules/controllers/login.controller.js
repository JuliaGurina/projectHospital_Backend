const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const User = require("../../db/models/task/indexLogin");
const errorHandler = require('../../utils/errorHandler');

module.exports.login = async (req, res) => {
    const { email } = req.body;
    const client = await User.findOne({ email }, req.body);

    if (client) {
        //Проверка пароля
        const passwordResult = bcrypt.compareSync(req.body.password, client.password);
        if (passwordResult) {
            //Пароли совпали
            const token = jwt.sign({
                email: client.email,
                userId: client._id
            }, keys.jwt, { expiresIn: 60 * 60 })

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            //Пароли не совпали
            res.status(401).json({
                message: 'Пароли не сопадают'
            })
        }
    } else {
        // Пользователя нет, ошибка
        res.status(404).json({
            message: 'Пользователь с таким email не найден'
        })
    }
};

module.exports.register = async (req, res) => {
    const { email } = req.body;
    const client = await User.findOne({ email }, req.body);

    if (client) {
        //Пользователь существует - ошибка 
        res.status(409).json({
            message: 'Такой email уже занят'
        })
    } else {
        // Нужно создать пользователя
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
        })

        try {
            await user.save().then(result => {
                User.find({ email }, req.body).then(result => {
                    const token = jwt.sign({
                        email: req.body.email,
                        userId: result._id
                    }, keys.jwt, { expiresIn: 60 * 60 })

                    res.status(201).json({
                        email: req.body.email,
                        token: `Bearer ${token}`
                    })
                })
            })
        } catch (e) {
            errorHandler(res, error);
        }
    }
};