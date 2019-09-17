import ServiceController from "./src/services/ServiceController";
import FlatScheme from "./src/schemes/FlatScheme";

//Bring in core dependencies 
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const pegasus = express();
const dotenv = require('dotenv');

const serviceContainer = new ServiceController();

//Config our local settings
dotenv.config();

//Database setup
const connection = require('./database');
connection.connect();  
connection.end();

//Bring in your schemes
const flatScheme = new FlatScheme();

//Register your schemes in the service container here
serviceContainer.registerServices([flatScheme]);

//Start all registered services
serviceContainer.startServices();

//Declare middleware
pegasus.use(express.json());
pegasus.use(helmet());
pegasus.use(cors());
//pegasus.use('/api/propowner', propowner);

const port = process.env.DEFAULT_PORT;

module.exports = pegasus.listen(port, () => console.log(`Pegasus Server Started On Port ${port}`));