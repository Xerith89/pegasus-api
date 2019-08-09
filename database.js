const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

//Connect to MySQL
const connection = mysql.createConnection({
    host: process.env.TEST_DB_HOST,
    user: process.env.TEST_DB_USER,
    database: process.env.TEST_DB
 });

//Connect to SQL
module.exports = connection;