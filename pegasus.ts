import ServiceController from './src/core/ServiceController';
import ExampleService from './src/services/ExampleService';
import express = require('express');
import helmet = require('helmet');
import cors = require('cors');
import dotenv = require('dotenv');
import ExampleTwo from './src/services/ExampleTwo';
import Logger from './src/core/Logger';

//Bring in core dependencies 
const pegasus = express();
import serviceRouter from './src/core/ServiceRouter';
const serviceContainer = new ServiceController();

//Config our local settings
dotenv.config();

//Bring in your schemes
const exampleService = new ExampleService({name : null, age: null}, 'exampleservice', true);
const exampleServiceTwo = new ExampleTwo({numberA: null, numberB: null}, 'exampletwo', true);

//Register your schemes in the service container here
serviceContainer.registerServices([exampleService, exampleServiceTwo]);

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
    const command = line.split(" ");
    switch(command[0]) {
        case 'stopall' :
            serviceContainer.stopServices();
            break;
        case 'startall' :
            serviceContainer.startServices();
            break;
        case 'start' :
            serviceContainer.startService(command[1]);
            break;
        case 'stop' :
            serviceContainer.stopService(command[1]);
            break;
        case 'restart' :
            serviceContainer.restartService(command[1]);
            break;
        case 'shutdown':
            server.close();
            break;
        case 'listall':
            serviceContainer.listAll();
            break;
        case 'restartall':
            serviceContainer.restartAll();
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
    Logger.log('Pegasus Has Exited.', true, true);
});

module.exports = server;
