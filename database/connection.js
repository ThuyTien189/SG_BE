require('dotenv').config()
const knex = require('knex')
const connection = knex({
  client: 'mysql', 
  connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB,
  },
});
module.exports = connection