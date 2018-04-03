const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const lR = require('./controller/loginRegister');
const restaurant = require('./controller/restaurant');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());


//database connection
massive(process.env.CONNECTION_STRING).then(db => {
    console.log('database connected')
    app.set('db', db)
})


//session connection
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
        // 2 weeks
        maxAge: 60 * 60 * 24 * 14 * 1000
    } 
}))


// ENDPOINTS
app.post('/register', lR.register);
app.post('/login', lR.login);
app.post('/logout', lR.logout);
app.post('/profile-data', restaurant.addProfileData);

app.listen(4000, ()=> console.log('listening on port 4000'))