import ServiceController from "./ServiceController";
import Logger from './Logger';

const express = require('express');
const router = express.Router();
const logger = new Logger();

router.post('/', function (req:any, res:any) {
    console.log(req.params);
    res.send(`Hello`);
});

router.get('/', function (req : any, res: any) {
    let serviceName:string = req.baseUrl.substr(req.baseUrl.lastIndexOf('/') + 1);
    const requestedService = ServiceController.FindService(serviceName);
    if (requestedService !== null){
        if (requestedService.isExposed()) {
            res.send(`Hello ${serviceName}`);
            requestedService.Invoke();
        } else {
            res.send("Attempting To Access Unexposed Service From Endpoint");
            logger.log("Attempting To Access Unexposed Service From Endpoint");
        }
    } else {
        res.send("Service Not Found");
        logger.log("Service Not Found");
    }  
});

module.exports = router; 
