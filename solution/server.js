const express = require('express');
const { body, validationResult } = require("express-validator")
const app = express();
const mongoose = require("mongoose")
const Schema = mongoose.Schema
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

// Declare the Schema of the Mongo model
var userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

// Create the model - with the Model we can perform our CRUD operation
const User = mongoose.model('User', userSchema);


// BONUS TASK solution:
// hide password field using the mongoose toJSON hook
// => toJSON is called before we send a mongoose object to the browser
// e.g. on res.send(user) => actually toJSON will be called before
// userSchema.set("toJSON", {
//     transform: (doc, { password, __v, ...publicFields }, options) => publicFields
// })


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
    <style>label {display: block; }</style>
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

// SIGNUP MIDDLEWARE FOR VALIDATING INPUTS
app.post('/signup', 
    // validate email field
    body('email')
        .notEmpty().withMessage("Email not present")
        .bail() // "bail" prevents that further validations are done if the previous failed already
        .isEmail().withMessage("Email has not a valid format")
        .normalizeEmail(), 
    // validate password field
    body('password')
        .notEmpty().withMessage("Password not present")
        .bail()
        .isLength({min: 4}).withMessage("Password must have min 4 characters"),
    (req, res, next) => {

    const errors = validationResult(req)
    
    if(!errors.isEmpty()) {
        // send the errors as array (and not as object) 
        return res.status(400).send(errors.array())
    }
    next()
})

/**
 * Get incoming user signups: email & password
 * Hash the PW & create a user in the DB
 */
app.post('/signup', (req, res) => {
    console.log("POST signup route called")

    // check if a user with this email does not 
    // exist already...
    User.findOne({email: req.body.email}).then(user => {
        // user does not exist -> create it
        if(!user) {
            User.create({
                email: req.body.email,
                // hash the given password before saving it to the DB!
                password: bcrypt.hashSync(req.body.password, 10),
            })
            // return the freshly created user
            .then(userNew => {
                return res.send(userNew)
            })
        }
        // user already exists!
        else {
            res.status(400).send({
                error: "User with that email already exists"
            })
        }
    })
    .catch(err => next(err))
});

let port = 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});

//Run app, then load http://localhost:port in a browser to see the output.