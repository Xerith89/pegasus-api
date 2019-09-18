import ServiceController from "./ServiceController";
import Logger from './Logger';

const express = require('express');
const router = express.Router();
const logger = new Logger();

router.post('/', function (req:any, res:any) {
    let serviceName:string = req.baseUrl.substr(req.baseUrl.lastIndexOf('/') + 1);
    const requestedService = ServiceController.FindService(serviceName);
    if (requestedService !== undefined){

        if (requestedService.isExposed()) {

            //Check we have a valid input for our model
            if (!requestedService.validateInput(req)) {
                res.status(400).end();
                logger.log(`Bad Request ${serviceName}`)
                return;
            }

            res.json( requestedService.Invoke(req, res));
        } else {
            //Endpoint is forbidden
            res.status(403).end();
            logger.log("Attempting To Access Unexposed Service From Endpoint");
        }
    } else {
        //Can't find the service from the endpoint
        res.status(404).end();
        logger.log("Service Not Found");
    }  
});

module.exports = router; 
