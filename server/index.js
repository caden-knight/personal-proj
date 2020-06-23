require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const app = express()
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env
const authCtrl = require('./contollers/authCtrl')
const ctrl = require('./contollers/ctrl')

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
app.delete('./auth/logout', authCtrl.logout)

//user posts endpoints
app.get('/api/posts', ctrl.allPosts) //allPosts
app.get('/api/post/:postid', ctrl.getPost) //getPost
app.post('/api/post', ctrl.newPost) //newPost
app.put('/api/post/:postid', ctrl.editPost) //editPost
app.delete('/api/post/:postid', ctrl.deletePost) //deletePost

//journal entry endpoints
app.get('/api/entries') //allEntries?
app.get('/api/entry/:entryid', ctrl.getEntry) //getEntry
app.post('/api/entry', ctrl.newEntry) //newEntry
app.put('/api/entry/:entryid', ctrl.editEntry) //editEntry
app.delete('/api/entry/:entryid', ctrl.deletePost) //deleteEntry

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    console.log('ALL SYSTEMS ONLINE')
    app.listen(SERVER_PORT, () => console.log(`SYSTEMS READY ON ${SERVER_PORT}`)) 
}).catch(err => console.log(err))




