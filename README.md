# Authentication - Exercise #1 - User signup

In this exercise we now want to create signup for our pizza store, so the customer can register his address data. At a later point he will be able to easily place a new order without typing his whole address details again.

First we want to provide the possibility to signup by form. So we need to implement user creation now.

## User signup with password hashing

* Install bcrypt, express, mongoose in one go:
    * `npm i express mongoose bcrypt`

* Please find the register form in the given server.js file (route GET /signup)

* Setup a Mongoose user schema
    * fields: email, password

* Create a POST route /signup
    * Create a password hash for the received password string by using bcrypt.hash
    * After hashing is done
        * Create a user in the mongoose database with this email and password
    * Return back the created user object to the browser

* Test the signup in the browser
    * Check if you receive the user with the password hash after form submit


### Bonus Task

* Hide the password on returned User objects
    * Adapt your User schema 
        * Reasearch: hide mongoose schema fields in output using the schema.set("toJSON", {...}) method 
        * Hide the password field
    * Adapt route /POST signup 
        * send back the whole user object instead of just email and id
    * Do a registration in the browser and test the result
        * Check that the password is now not shown in the JSON output!


### Bonus Task

* Install package "express-validator"

* Add validation for your POST route 
    * check if email and password are present by using the matcher function "notEmpty()"
    * Check if the provided email is actually an email
    * Give different validation messages for each email check (email not present & provided email is not an email)

* Normalize the email using the sanitizer .normalizeEmail()