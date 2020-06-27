const bcrypt = require('bcryptjs');

module.exports = {
	login: async (req, res) => {
		//connect to db
		const db = req.app.get('db')
		const {username, password} = req.body

		try {
			//check the user
			const existingUser = await db.check_user(username)
			if(!existingUser[0]) {
				return res.status(404).send('Username or password is incorrect')
			}

			//authenticate the user and send it
			const authenticated = bcrypt.compareSync(password, existingUser[0].password)
			if(!authenticated) {
				return res.status(409).send('Username or password is incorrect')
			}

			if(authenticated) {
				req.session.user = existingUser[0]
				res.status(200).send(existingUser[0])
			}
		} catch (err) {
			console.log(err)
			res.status(404).send('Username or password incorrect')
		}

	},
	register: async (req, res) => {
		const db = req.app.get('db');
		const { username, password, profilePic } = req.body;

		const userExists = await db.check_user(username);

		//check to see if user already exists
		if (userExists[0]) {
			return res.status(409).send('Username taken');
		}

		//hashing password
		try {
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(password, salt);

			//register the user
			const newUser = await db.register([ username, hash, profilePic ]);

			req.session.user = newUser;

            res.status(200).send(newUser);
            
		} catch (err) {
			console.log(err);
			res.status(500).send('Something went wrong');
		}
	},
	 //get user data
	 getUser: (req, res) => {
        if(req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.sendStatus(404)
        }
	},
	
	logout: async (req, res) => {
		req.session.destroy()
		res.sendStatus(200)
	}
};
