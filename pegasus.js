//Bring in dependancies
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const pegasus = express();
const dotenv = require('dotenv');
dotenv.config();

const propowner = require('./src/routes/api/propowner');

const connection = require('./database');

connection.connect();
connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    if (err) throw err
  
    console.log('The solution is: ', rows[0].solution)
  })
  
connection.end();


//Declare middleware
pegasus.use(express.json());
pegasus.use(helmet());
pegasus.use(cors());
pegasus.use('/api/propowner', propowner);

const port = process.env.DEFAULT_PORT;

module.exports = pegasus.listen(port, () => console.log(`Pegasus Server Started On Port ${port}`));