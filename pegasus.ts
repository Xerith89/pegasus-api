import ServiceController from './src/core/ServiceController';
import ExampleService from './src/services/ExampleService';
import ExampleServiceModel from './src/services/ExampleServiceModel';
import express = require('express');
import helmet = require('helmet');
import cors = require('cors');
import dotenv = require('dotenv');

//Bring in core dependencies 
const pegasus = express();
const serviceRouter = require('./src/core/ServiceRouter');
const serviceContainer = new ServiceController();

//Config our local settings
dotenv.config();

//Bring in your models
const exampleServiceModel = new ExampleServiceModel();

//Bring in your schemes, bind the model, name them and decide if they are exposed to the endpoint
const exampleService = new ExampleService(exampleServiceModel, 'exampleservice', true);

//Register your schemes in the service container here
serviceContainer.registerServices([exampleService]);

//Start all registered services
serviceContainer.startServices();

//Declare middleware
pegasus.use(express.json());
pegasus.use(helmet());
pegasus.use(cors());
pegasus.use('/api/:name',serviceRouter);

const port = process.env.DEFAULT_PORT;

const server = pegasus.listen(port);

var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('Enter Command > ');
rl.prompt();

rl.on('line', function(line:string) {
    switch(line.trim()) {
        case 'stopall' :
            serviceContainer.stopServices();
            break;
        case 'startall' :
            serviceContainer.startServices();
            break;
        case 'close':
            server.close();
            break;
        case 'listall':
            serviceContainer.listAll();
            break;
        default:
            console.log('Unknown Command');
        break;
    }
    rl.prompt();
}).on('close', function() {
    process.exit(0);
});

//Stop all services on server close
server.on('close', function() {
    serviceContainer.stopServices();
    console.log('Pegasus Has Exited.');
});

module.exports = server;
