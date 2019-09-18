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
    (requestedService !== null ? requestedService.Invoke() : logger.log("Service Not Found"))
    res.send(`Hello ${serviceName}`);
});

module.exports = router; 
