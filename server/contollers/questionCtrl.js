module.exports = {
    askQuestion: async (req, res) => {
        //access db get stuff from req.body
        const db = req.app.get('db')
        const id = req.session.user.id
        const {question, message} = req.body

        //send request to db
        try {

            const userQuestion = await db.ask(question, message, id)
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
            
    },
    getQuestions: async (req, res) => {
        const db = req.app.get('db')
        
        const questions = await db.get_all_questions()

        if(!questions[0]) {
            return res.status(404).send('Not found')
        } else {
            res.status(200).send(questions)
        }
    },
    getQuestion: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params

        const question = await db.get_question(id)
        if(!question[0]) {
            return res.status(404).send('No question here')
        } else {
            res.status(200).send(question[0])
        }
    },
    answerQuestion: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        const {answer} = req.body

        const answered = await db.answer_question(answer, id)
        console.log(answered)
        if(!answered) {
            return res.sendStatus(404)
        } else {
            res.status(200).send(answered[0].answer)
        }
    }
}