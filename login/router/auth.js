const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const {validateUserRegister, validateUserUpdate} = require('../middleware/validateUser')
const validateRequest = require('../middleware/validateRequest')
const db = require('../database/connection')
const {getOne, create, update} = require('../database/query')
const {hashPassword, hashPasswordWithSalt} = require('../helpers/hash')

const router = express.Router()

const SECRET = "secret"

// REGISTER
router.post('/register', validateRequest, validateUserRegister, async (req, res) => {
    const {
        username,
        password, 
        name, 
        age, 
        gender,
        email
    } = req.body
    // console.log(username, password);
    // check if user with username already existed
    const isUserExisted = await getOne( {
        db,
        query: 'SELECT * FROM users WHERE username = ?',
        params: username
    })
    if(isUserExisted) {
        return res.status(400).json( {
            message: 'Username already exists'
        })
    }
    const {
        hashedPassword,
        salt
    } = hashPassword(password)
    // console.log(hashedPassword);
    const isUserCreated = await create( {
        db,
        query: 'INSERT INTO users (username, password, salt, name, email, age, gender) VALUES (?, ?, ?, ?, ?, ?, ?)',
        params: [
            username,
            hashedPassword,
            salt,
            name,
            email,
            age,
            gender,
        ]
    })
    if(isUserCreated) {
        return res.status(200).json({
            message: 'Register successfully'
        })
    }
    return res.status(500).json({
        message: 'Internal server error'
    })
})

// LOGIN
router.post('/login', validateRequest, async function (req, res) {
    // Get username, password from request body
    const {
        username,
        password, 
    } = req.body
    // Check if user exists
    const isUserExisted = await getOne( {
        db,
        query: 'SELECT * FROM users WHERE username = ?',
        params: username
    })
    if(!isUserExisted) {
        return res.status(400).json( {
            message: 'User not found',
        })
    }
    else {
        const salt = isUserExisted.salt
        const password_db = isUserExisted.password
        const hashedPassword = hashPasswordWithSalt(password, salt)
        if(password_db == hashedPassword) {
            const jwt = jsonwebtoken.sign({
                id: isUserExisted.id,
                username: isUserExisted.username,
                password: isUserExisted.password, 
                name: isUserExisted.name, 
                age: isUserExisted.age, 
                gender: isUserExisted.gender,
                email: isUserExisted.email
            }, SECRET, {
                algorithm: 'HS256',
                expiresIn: '1h',
            })
            return res.status(200).json({ 
                data: jwt,
                message: "Login successful"
            })
        }
        else {
            return res.status(400).json( {
                message: 'Invalid password',
            })
        }
    }
});

module.exports = router