import ServiceController from './src/services/ServiceController';
import FlatScheme from './src/schemes/FlatScheme';
import FlatSchemeModel from './src/schemes/FlatSchemeModel';
import MyScheme from './src/schemes/MyScheme'
import MySchemeModel from './src/schemes/MySchemeModel'

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
    const flatSchemeModel = new FlatSchemeModel();
    const mySchemeModel = new MySchemeModel();

    //Bring in your schemes and bind a model to it
    const flatScheme = new FlatScheme(flatSchemeModel, 'flatscheme');
    const myScheme = new MyScheme(mySchemeModel, "myscheme");

    //Register your schemes in the service container here
    serviceContainer.registerServices([flatScheme, myScheme]);

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