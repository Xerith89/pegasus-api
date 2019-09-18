import {Service} from './Service'

export default class ServiceController {
    private static serviceContainer : Service[] = [];

    registerServices(service: Service[]) : void {
        service.forEach(element => {
            ServiceController.serviceContainer.push(element);
        }); 
    }

    startServices() : void {
        ServiceController.serviceContainer.forEach(service => {
          service.UpdateStatus( service.Start() )
      });
    }

    static FindService(serviceName :string) : any {
     return ServiceController.serviceContainer.find((element) => {
            return serviceName === element.getServiceName();
        });
    }

   
}