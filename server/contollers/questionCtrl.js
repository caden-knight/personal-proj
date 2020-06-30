module.exports = {
    askQuestion: async (req, res) => {
        //access db get stuff from req.body
        const db = req.app.get('db')
        const {question, message} = req.body

        //send request to db
        try {

            const userQuestion = await db.ask(question, message)
            if(!userQuestion[0]) {
                return res.status(409).send('Could not send question')
            } else {
                res.sendStatus(200)
            }
        }
        catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
            
    }
}