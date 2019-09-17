import {Service} from './Service'

export default class ServiceController {
    serviceContainer : Service[];

    constructor(){
        this.serviceContainer = [];
    }

    registerServices(service: Service[]) : void {
        service.forEach(element => {
            this.serviceContainer.push(element);
        }); 
    }

    startServices() : void {
      this.serviceContainer.forEach(service => {
          service.UpdateStatus( service.Start() )
      });
    }
}