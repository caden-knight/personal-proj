module.exports = {
    //Post methods
    allPosts: async (req, res) => {
        const db = req.app.get('db')

        //retrieve all
        try {
            const allPosts = await db.get_all_posts()
            if(allPosts[0]) {
                res.status(200).send(allPosts)
            }
        }
        catch {
            res.sendStatus(500)
        }
    },
    getPost: (req, res) => {},
    newPost: async (req, res) => {
        const db = req.app.get('db')
        const {title, content} = req.body
        const userid = req.session.user.id

        const newPost = await db.create_post(title, content, userid)

        try {
            res.status(200).send(newPost)
        }
        catch {
            res.sendStatus(409)
        }
    },
    editPost: (req, res) => {},
    deletePost: (req, res) => {},

    //Journal Entries methods
    getEntry:(req, res) => {},
    newEntry: (req, res) => {},
    editEntry: (req, res) => {},
    deletePost: (req, res) => {}
}