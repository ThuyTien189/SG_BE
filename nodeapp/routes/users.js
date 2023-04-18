const validateUser = require('../middleware/validateUser')

const express = require('express');

const user_router = express.Router();

const users = [
	{
		"id": 1,
		"fullname": "Nguyen Huy Tuong",
		"gender": true,
		"age": 18
	},
	{
		"id": 2,
		"fullname": "Nguyen Thi Tuong",
		"gender": false,
		"age": 15
	}
]

// truy xuất, lấy dữ liệu
user_router.get('/', (req, res) => {
    res.status(200).json(users);
});

user_router.get('/:id', (req, res) => {
    const user = users.find(user => 
        user.id === parseInt(req.params.id)
    )
    if(!user) {
        res.status(404).json('ID không tồn tại')
    }
    res.status(200).json(user);
});

// thêm dữ liệu
user_router.post('/', validateUser, function(req, res) {
    // console.log(req.body);
    const user = {
        id : users[users.length - 1].id + 1,
        fullname : req.body.fullname,
        gender : req.body.gender,
        age : req.body.age
    }
    users.push(user);
    res.status(201).json(users)
})

// sửa dữ liệu
user_router.put('/:id', validateUser, function(req, res) {
    const user = users.find(user => 
        user.id === parseInt(req.params.id)
    )
    if(!user) {
        res.status(404).json('ID không tồn tại')
    }
    if(Object.keys(req.body).length !== 0) {
        user.fullname = req.body.fullname
        user.gender = req.body.gender
        user.age = req.body.age
        res.status(200).json(user)
    }
    else {
        res.status(204).json()
    }
})

// xóa dữ liệu
user_router.delete('/:id', function(req, res) {
    const user = users.find(user => 
        user.id === parseInt(req.params.id)
    )
    if(!user) {
        res.status(404).json('ID không tồn tại')
    }
    users.splice(users.indexOf(user), 1)
    res.status(204).json()
})

// Exports cho biến user_router
module.exports = user_router;