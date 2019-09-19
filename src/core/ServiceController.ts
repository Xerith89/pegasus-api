import {Service} from './Service'
import Logger from './Logger';

export default class ServiceController {

    logger = new Logger();

    private static serviceContainer : Service[] = [];

    registerServices(service: Service[], targetContainer?: Service[]) : void {
        service.forEach(element => {
            this.logger.log(`${element.getServiceName()} Registered Successfully`);
            if (targetContainer) {
                targetContainer.push(element);
            } else {
                ServiceController.serviceContainer.push(element);
            }
           
        }); 
    }

    startServices(targetContainer?: Service[]) : void {
        if (targetContainer) {
            targetContainer.forEach(service => {
                if (!service.isRunning()) {
                    this.logger.log(`${service.getServiceName()} Started Successfully`);
                    service.updateRunningStatus( true );
                    service.start();
                }
            });
        } else {
            ServiceController.serviceContainer.forEach(service => {
                if (!service.isRunning()) {
                    this.logger.log(`${service.getServiceName()} Started Successfully`);
                    service.updateRunningStatus( true );
                    service.start();
                }
            });
        }
    }

    startService(serviceName:string, targetContainer?: Service[]) : void {
        if (targetContainer) {
            const service = ServiceController.FindService(serviceName, targetContainer);
            service.updateRunningStatus( true );
            service.start();
        }else {
            const service = ServiceController.FindService(serviceName);
            service.updateRunningStatus( true );
            service.start();
        }
      
    }

    stopService(serviceName:string, targetContainer?: Service[]) : void {
        if (targetContainer) {
            const service = ServiceController.FindService(serviceName, targetContainer);
            service.updateRunningStatus( false );
            service.stop();
        } else {
            const service = ServiceController.FindService(serviceName);
            service.updateRunningStatus( false );
            service.stop();
        }
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

    static FindService(serviceName :string, targetContainer?: Service[]) : any {
        if (targetContainer) {
            return targetContainer.find((element) => {
                return serviceName === element.getServiceName();
            });
        } else {
            return ServiceController.serviceContainer.find((element) => {
                return serviceName === element.getServiceName();
            });
        }
     
    }

   
}