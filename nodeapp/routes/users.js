const validateUser = require('../middleware/validateUser')
const connection = require('../../database/connection')
const express = require('express');

const user_router = express.Router();

// truy xuất, lấy dữ liệu
user_router.get('/', (req, res) => {
    connection.query("SELECT * FROM Users", (err, result) => {
        if(err) {
            return res.status(500).send("Error: " + err.message)
        }
        else return res.status(200).json(result)
    })
});

user_router.get('/:id', (req, res) => {
    const id = req.params.id
    connection.query("SELECT * FROM Users WHERE id = ?" , [id], (err, result) => {
        if(err) {
            return res.status(500).send("Error: " + err.message)
        }
        else return res.status(200).json(result)
    })
});

// thêm dữ liệu
user_router.post('/', validateUser, function(req, res) {
    // console.log(req.body);
    const {fullname, gender, age} = req.body;
    connection.query("INSERT INTO Users(fullname, gender, age) VALUES (?, ?, ?)", (err, result) => {
        if (err) {
            return res.status(500).send("Error: " + err.message)
        }
        else {
            return res.status(201).send("Success")
        }
    })
})

// sửa dữ liệu
user_router.put('/:id', validateUser, function(req, res) {
    const id = req.params.id;
    const {fullname, gender, age} = req.body;
    connection.query("UPDATE Users SET fullname = ?, gender = ?, age = ? WHERE id = ?" , [fullname, gender, age, id], (err, result) => {
        if (err) {
            return res.status(500).send("Error: " + err.message)
        }
        else {
            return res.status(204).send("Success")
        }
    })
})

// xóa dữ liệu
user_router.delete('/:id', function(req, res) {
    const id = req.params.id;
    connection.query("DELETE FROM Users WHERE id = ?" , [id], (err, result) => {
        if (err) {
            return res.status(500).send("Error: " + err.message)
        }
        else {
            res.status(204).send("Success")
        }
    })
})

// Exports cho biến user_router
module.exports = user_router;