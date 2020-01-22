const express = require('express');
const { body, validationResult } = require("express-validator")
const app = express();
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

// CONNECT TO MONGODB
mongoose.connect('mongodb://localhost/users_db', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

// ... TODO: DEFINE USER SCHEMA & MODEL HERE....

// parse incoming form data
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

/**
 * Provide a signup form
 */
app.get('/signup', (req, res) => {
    const strForm = `
    <style>label { display: block; }</style>
    <h1>Signup for our pizza store</h1>
    <form action="/signup" method="POST">
        <label for="title">Email</label>
        <input type="text" name="email" id="email" />
        <br />
        <label for="email">Password</label>
        <input type="password" name="password" id="password" />
        <br />
        <button type="submit">Signup</button>
    </form>
    <div>
        <p>Your incredible signup benefits:</p>
        <ul>
            <li>Place orders quickly without typing your address again</li>
            <li>See all your previous orders to feel gratitude for all the money you wasted on our services</li>
        </ul>
    </div>
    `
    res.send(strForm)
})

// TODO: WRITE THE SIGNUP LOGIC INTO THIS ROUTE 
app.post('/signup', (req, res) => {
    console.log("POST signup route called")

    let body = req.body

});

let port = 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});

//Run app, then load http://localhost:port in a browser to see the output.