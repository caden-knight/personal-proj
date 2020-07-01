//Journal Entries methods
module.exports = {
	getEntry: async (req, res) => {
		//access db queries & declare params
		const db = req.app.get('db');
		const { entryid } = req.params;

		//call the db query
		const entry = await db.get_entry(entryid);

		//check if it exists
		if (entry[0]) {
			res.status(200).send(entry[0]);
		} else {
			return res.status(404).send('Entry not found');
		}
	},
	getUserEntries: async (req, res) => {
		const db = req.app.get('db')
		const userId = req.session.user.id

		try {
			const userEntries = await db.get_entries_by_id(userId)
			if(!userEntries[0]) {
				return res.status(404).send('No entries found bruv')				
			} else {
				res.status(200).send(userEntries)
			}
		} catch(err) {
			console.log(err)
			res.sendStatus(500)
		}
	},
	newEntry: async (req, res) => {
		//access the database
		//get what you need from req.body
		const db = req.app.get('db');
		const id = req.session.user.id;
		const { lucid, title, date, content, dreamSigns } = req.body;
	
		//create new entry
		const newEntry = await db.add_entry(lucid, title, content, dreamSigns, date, id);

		//send it to the frontend
		if (newEntry) {
			res.status(200).send(newEntry);
		}

		//account for errors
		if (!newEntry) {
			res.sendStatus(500);
		}
	},
	editEntry: async (req, res) => {
        //connect to database queries
        //get params
		const db = req.app.get('db');
        const { entryid } = req.params;
        const { lucid, title, content, dreamSigns } = req.body;

		//call the db query
        const editedPost = await db.edit_entry(lucid, title, content, dreamSigns, entryid)

        //send it and account for errors
        if(!editedPost) {
            return res.status(404).send('No post to edit')
        } else {
            res.status(200).send(editedPost)
        }        
	},
	deleteEntry: async (req, res) => {
		//access database queries
		const db = req.app.get('db');
		const { entryid } = req.params;

		//delete the entry
		await db.delete_entry(entryid).catch((err) => console.log(err));
		res.sendStatus(200);
    }
};