import ServiceController from './src/services/ServiceController';
import ExampleScheme from './src/schemes/ExampleScheme';
import ExampleSchemeModel from './src/schemes/ExampleSchemeModel';
import express = require('express');
import helmet = require('helmet');
import cors = require('cors');

import dotenv = require('dotenv');


//TODO - console input commands, logging to files and console

//Bring in core dependencies 
const pegasus = express();
const serviceRouter = require('./src/services/ServiceRouter');
const serviceContainer = new ServiceController();


//Config our local settings
dotenv.config();

//Bring in your models
const exampleSchemeModel = new ExampleSchemeModel();

//Bring in your schemes, bind the model, name them and decide if they are exposed to the endpoint
const exampleScheme = new ExampleScheme(exampleSchemeModel, 'examplescheme', true);

//Register your schemes in the service container here
serviceContainer.registerServices([exampleScheme]);

//Start all registered services
serviceContainer.startServices();

//Declare middleware
pegasus.use(express.json());
pegasus.use(helmet());
pegasus.use(cors());
pegasus.use('/api/:name',serviceRouter);

const port = process.env.DEFAULT_PORT;

const server = pegasus.listen(port);

    //Stop all services on server close
server.on('close', function() {
    serviceContainer.stopServices();
});

server.close();

module.exports = server;
