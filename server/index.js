require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const app = express()
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 14},
    secret: SESSION_SECRET
}))

//Post endpoints


massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    console.log('ALL SYSTEMS ONLINE')
    app.listen(SERVER_PORT, () => console.log(`SYSTEMS READY ON ${SERVER_PORT}`)) 
}).catch(err => console.log(err))


