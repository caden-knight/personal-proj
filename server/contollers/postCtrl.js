module.exports = {
	//Post methods
	allPosts: async (req, res) => {
		const db = req.app.get('db');

		//retrieve all
		try {
			const allPosts = await db.get_all_posts();
			if (allPosts[0]) {
				res.status(200).send(allPosts);
			} else if (!allPosts) {
				res.status(404).send('No posts were found');
			}
		} catch (err) {
			console.log(err);
			res.sendStatus(500);
		}
	},
	getPost: (req, res) => {},
	newPost: async (req, res) => {
		const db = req.app.get('db');
		const { title, content } = req.body;
		const userid = req.session.user.id;

		const newPost = await db.create_post(title, content, userid);
		try {
			if(newPost){	
				res.status(200).send(newPost);
			}
		} catch (err) {
			console.log(err);
			res.sendStatus(409);
		}
	},
	editPost: async (req, res) => {
		const db = req.app.get('db');
		const { title, content } = req.body;
		const { postId } = req.params;

		const editedPost = await db.edit_post(title, content, postId);

		try {
			if (editedPost) {
				res.status(200).send(editedPost);
			}
		} catch (err) {
			console.log(err);
			res.sendStatus(500);
		}
	},
	deletePost: (req, res) => {
		const db = req.app.get('db');
		const { postId } = req.params;

        const deletedPost = db.delete_post([ postId ]);

        try {
            if (!deletedPost[0]) {
                return res.status(404).send('No post to delete');
            }
            if (deletedPost[0]) {
                res.status(200).send('Post deleted');
            }
        } catch (err) {
            res.sendStatus(500)
            console.log(err)
        }
	},
};
