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
    if (requestedService !== undefined){
        if (requestedService.isExposed()) {
            res.json( requestedService.Invoke(req, res));
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
