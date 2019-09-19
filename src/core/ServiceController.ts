import {Service} from './Service'
import Logger from './Logger';

export default class ServiceController {

    logger = new Logger();

    private static serviceContainer : Service[] = [];

    registerServices(service: Service[]) : void {
        service.forEach(element => {
            this.logger.log(`${element.getServiceName()} Registered Successfully`);
            ServiceController.serviceContainer.push(element);
        }); 
    }

    startServices() : void {
        ServiceController.serviceContainer.forEach(service => {
            if (!service.isRunning()) {
                this.logger.log(`${service.getServiceName()} Started Successfully`);
                service.updateRunningStatus( true );
                service.start();
            }
      });
    }

    startService(serviceName:string) : void {
       const service = ServiceController.FindService(serviceName);
       service.updateRunningStatus( true );
       service.start();
    }

    stopService(serviceName:string) : void {
        const service = ServiceController.FindService(serviceName);
        service.updateRunningStatus( false );
        service.stop();
     }

    stopServices(): void {
        this.logger.log("Attempting To Stop All Services...");
        ServiceController.serviceContainer.forEach(service => {
            if (service.isRunning()){
                this.logger.log(`${service.getServiceName()} Stopped Successfully`);
                service.updateRunningStatus( false );
                service.stop();
            }
      });
    }

    listAll():void {
        ServiceController.serviceContainer.forEach(service => {
            this.logger.log(`${service.getServiceName()} Running: ${service.isRunning()}`);
      });
    }

    restartAll():void {
        this.logger.log("Restarting All Services...");
        ServiceController.serviceContainer.forEach(service => {
            if (service.isRunning()){
                service.updateRunningStatus( false );
                service.stop();
                service.updateRunningStatus( true );
                service.start();
            }
        });
        this.logger.log("All Services Restarted");
    }

    restartService(serviceName:string) : void {
        const service = ServiceController.FindService(serviceName);
        service.updateRunningStatus( false );
        service.stop();
        service.updateRunningStatus( true );
        service.start();
     }

    static FindService(serviceName :string) : any {
     return ServiceController.serviceContainer.find((element) => {
            return serviceName === element.getServiceName();
        });
    }

   
}