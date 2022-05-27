const mysql = require('mysql')
const util = require('util')
require('dotenv').config()

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
})

const db = util.promisify(connection.query).bind(connection)

module.exports = { db, connection }




