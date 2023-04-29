const db = require('../database/connection')
const jsonwebtoken = require('jsonwebtoken');
const express = require('express');
const {getOne, create, update} = require('../database/query')
const {hashPassword, hashPasswordWithSalt} = require('../helpers/hash')
const {validateUserRegister, validateUserUpdate} = require('../middleware/validateUser')

const route = express.Router();

const SECRET = "secret"

// UPDATE USER INFO
route.put('/:id', validateUserUpdate, async function(req, res) {
    const id = req.params.id;
    const {
        username,
        password, 
        name, 
        age, 
        gender,
        email
    } = req.body
    const {
        hashedPassword,
        salt
    } = hashPassword(password)
    const authorizationHeader = req.headers.authorization;
    const userToken = authorizationHeader.substring(7);

    // Verify token
    try {
        const isTokenValid = jsonwebtoken.verify(userToken, SECRET);
        console.log(isTokenValid);
        
        // Authorization success
        if (isTokenValid.id == id) {
            const user = await getOne( {
                db,
                query: 'SELECT * FROM users WHERE id = ?',
                params: id
            })
            if (!user) {
                return res.status(400).json( {
                    message: 'User not found'
                })
            }
            const isUpdateUser = await update( {
                db,
                query: 'UPDATE Users SET username = ?, password = ?, salt = ?, name = ?, email = ?, age = ?, gender = ? WHERE id = ?',
                params: [
                    username,
                    hashedPassword, 
                    salt,
                    name, 
                    email, 
                    age,
                    gender,
                    id
                ]
            })
            if(!isUpdateUser) {
                return res.status(500).json("Error")
            }
            return res.status(200).json({
                message: "Update user successful"
            })
        }

        // Authorization failed
        return res.status(401).json({
            message: 'unauthorized',
        });
    } catch (error) {
        return res.status(401).json({
            message: error.message,
        });
    }
})

module.exports = route;