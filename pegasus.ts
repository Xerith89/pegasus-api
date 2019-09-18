import ServiceController from './src/services/ServiceController';
import ExampleScheme from './src/schemes/ExampleScheme';
import ExampleSchemeModel from './src/schemes/ExampleSchemeModel';


namespace Pegasus {
    //Bring in core dependencies 
    const express = require('express');
    const helmet = require('helmet');
    const cors = require('cors');
    const pegasus = express();
    const dotenv = require('dotenv');

    const serviceContainer = new ServiceController();
    const serviceRouter = require('./src/services/ServiceRouter');

    //Config our local settings
    dotenv.config();

    //Database setup
    const connection = require('./database');
    connection.connect();  
    connection.end();

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

    module.exports = pegasus.listen(port, () => console.log(`Pegasus Server Started On Port ${port}`));
}