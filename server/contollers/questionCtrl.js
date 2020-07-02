require('dotenv').config();
const nodemailer = require('nodemailer');
const { EMAIL, PASSWORD } = process.env;

module.exports = {
	askQuestion: async (req, res) => {
		//access db get stuff from req.body
		const db = req.app.get('db');
		const id = req.session.user.id;
		const { question, message } = req.body;

		//send request to db
		try {
			const userQuestion = await db.ask(question, message, id);
			console.log(userQuestion)
			if (!userQuestion[0]) {
				return res.status(409).send('Could not send question');
			} else {
				res.sendStatus(200)
			}
		} catch (err) {
			console.log(err);
			res.sendStatus(500);
		}
	},
	getQuestions: async (req, res) => {
		const db = req.app.get('db');

		const questions = await db.get_all_questions();

		if (!questions[0]) {
			return res.status(404).send('Not found');
		} else {
			res.status(200).send(questions);
		}
	},
	getQuestion: async (req, res) => {
		const db = req.app.get('db');
		const { id } = req.params;

		const question = await db.get_question(id);
		if (!question[0]) {
			return res.status(404).send('No question here');
		} else {
			res.status(200).send(question[0]);
		}
	},
	answerQuestion: (req, res) => {
		const db = req.app.get('db');
		const { id } = req.params;
		const { answer } = req.body;
		const email = req.session.user.email;
		console.log(email);

		try {
			const answered = db.answer_question(answer, id);
			if (!answered) {
				return res.sendStatus(404);
			}

			if (!email) {
				return res.status(409).send('No recipient');
			} else {
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
					subject: 'One of Your Questions Has Been Answered',
					text:
						'One of our experts sent you an answer to one of the questions you submitted. Login to see the answer!'
				};

				transporter.sendMail(mailOptions, function(err, data) {
					if (err) {
						console.log(err);
					} else {
						console.log('Email was sent ya filthy animal');
					}
				});
			}
			res.sendStatus(200);
		} catch (err) {
			console.log(err);
		}
	}
};
