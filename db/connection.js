const mysql = require('mysql2');

require('dotenv').config();

// connect to database
const db = mysql.createConnection(
    {
        host:'127.0.0.1',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log('connected to the company database')
);

module.exports = db;