const keys = require('../config/keys');
const jwt = require('jsonwebtoken');

const verificationUser = (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];
	if (token == null) return res.sendStatus(401);
	jwt.verify(token, keys.jwt, (err, user) => {
		if (err) return res.status(403).send({ message: err });
		req.user = user;
		next();
	});
};

module.exports = verificationUser;