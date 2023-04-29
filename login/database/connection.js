const mysql = require('mysql')
require('dotenv').config()
// console.log(process.env.DB);

connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB,
})

module.exports = connection;