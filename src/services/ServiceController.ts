import {Service} from './Service'

export default class ServiceController {
    serviceContainer : Service[];

    constructor(){
        this.serviceContainer = [];
    }

    registerServices(service: any) : void {
        this.serviceContainer.push(service);
    }

    startServices() : void {
        this.serviceContainer.forEach((service) => {
            console.log(service);
        });
    }
}