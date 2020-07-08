require('dotenv').config();
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { EMAIL, PASSWORD } = process.env;

module.exports = {
	login: async (req, res) => {
		//connect to db
		const db = req.app.get('db');
		const { email, username, password } = req.body;

		try {
			//check the user
			const existingUser = await db.check_user(username, email);
			if (!existingUser[0]) {
				return res.status(404).send('Username or password is incorrect');
			}

			//authenticate the user and send it
			const authenticated = bcrypt.compareSync(password, existingUser[0].password);
			if (!authenticated) {
				return res.status(409).send('Username or password is incorrect');
			}

			if (authenticated) {
				req.session.user = existingUser[0];
				res.status(200).send(existingUser[0]);
			}
		} catch (err) {
			console.log(err);
			res.status(404).send('Username or password incorrect');
		}
	},
	register: async (req, res) => {
		const db = req.app.get('db');
		const { email, username, password, profilePic } = req.body;

		const userExists = await db.check_user(username, email);

		//check to see if user already exists
		if (userExists[0]) {
			return res.status(409).send('Username taken');
		}

		//hashing password
		try {
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(password, salt);

			//register the user
			const newUser = await db.register([ email, username, hash, profilePic ]);

			req.session.user = newUser[0];
			let transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: PASSWORD,
					pass: EMAIL
				}
			});

			let mailOptions = {
				from: 'lucidographyteam@gmail.com',
				to: email,
				subject: 'Welcome',
				text: 'Welcome to the Lucidography community! We are so happy to have you! Happy Dreaming!'
			};

			transporter.sendMail(mailOptions, function(err, data) {
				if (err) {
					console.log(err);
				} else {
					console.log('Email sent ya filthy animal');
				}
			});

			res.status(200).send(newUser[0]);
		} catch (err) {
			console.log(err);
			res.status(500).send('Something went wrong');
		}
	},
	//get user data
	getUser: (req, res) => {
		if (req.session.user) {
			res.status(200).send(req.session.user);
		} else {
			res.sendStatus(404);
		}
	},

	logout: async (req, res) => {
		req.session.destroy();
		res.sendStatus(200);
	}
};
