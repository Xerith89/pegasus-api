//Bring in dependancies
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const pegasus = express();

//Mongo will be used to store input and output

//Declare middleware
pegasus.use(express.json());
pegasus.use(helmet());
pegasus.use(cors());

const port = process.env.port;

module.exports = pegasus.listen(port, () => console.log(`Pegasus Server Started On Port ${port}`));