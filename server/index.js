require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const app = express()
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env
const authCtrl = require('./contollers/authCtrl')
const postCtrl = require('./contollers/postCtrl')
const journalCtrl = require('./contollers/journalCtrl')

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 14},
    secret: SESSION_SECRET
}))

//Auth endpoints
app.post('/auth/login', authCtrl.login)
app.post('/auth/register', authCtrl.register)
app.get('/auth/user', authCtrl.getUser)
app.delete('/auth/logout', authCtrl.logout)

//user posts endpoints
app.get('/api/posts', postCtrl.allPosts) //allPosts
app.get('/api/post/:postid', postCtrl.getPost) //getPost
app.post('/api/post', postCtrl.newPost) //newPost
app.put('/api/post/:postId', postCtrl.editPost) //editPost
app.delete('/api/post/:postId', postCtrl.deletePost) //deletePost

//journal entry endpoints
app.get('/api/entries', journalCtrl.allEntries) //allEntries
app.get('/api/entry/:entryid', journalCtrl.getEntry) //getEntry
app.post('/api/entry', journalCtrl.newEntry) //newEntry
app.put('/api/entry/:entryid', journalCtrl.editEntry) //editEntry
app.delete('/api/entry/:entryid', journalCtrl.deleteEntry) //deleteEntry

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    console.log('ALL SYSTEMS ONLINE')
    app.listen(SERVER_PORT, () => console.log(`SYSTEMS READY ON ${SERVER_PORT}`)) 
}).catch(err => console.log(err))