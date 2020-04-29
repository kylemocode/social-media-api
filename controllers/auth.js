const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
	let { email, password } = req.body;
	const user = await User.findOne({ where: { email } });
	if (user) {
		return res.status(404).send('Email is already exist.');
	}
	try {
		bcrypt.genSalt(10, (err, salt) => {
			if (err) {
				return res.status(422).send("genSalt error");
			}

			bcrypt.hash(password, salt, async (err, hash) => {
				if (err) {
					return res.status(422).send("hash error");
				}
				password = hash;
				const createdUser = await User.create({ email, password });
				await createdUser.save()
				const token = jwt.sign({ userId: createdUser.id }, 'MY_SECRET_KEY')
				return res.send({ token });
			})
		})
	} catch (err) {
		return res.status(422).send(err.message);
	}
};

exports.login = async (req, res) => {
	let { email, password } = req.body;
	console.log(email)
	if (!email || !password) {
		return res.status(422).send({ error: "Must Provide email and password" });
	}

	const user = await User.findOne({ where: { email } });
	console.log(user)
	if (!user) {
		return res.status(404).send({ error: 'Email not found' })
	}

	try {
		bcrypt.compare(password, user.password, (err, isMatch) => {
			if (err || !isMatch) {
				return res.status(404).send({ error: 'password not correct' });
			}
			const token = jwt.sign({ userId: user.id }, "MY_SECRET_KEY")
			res.send({ token });
		})
	} catch (err) {
		return res.status(422).send({ error: "User signin failed." })
	}
};

exports.logout = (req, res) => {

};