import {Service} from './Service'
import Logger from './Logger';

export default class ServiceController {


    private static serviceContainer : Service[] = [];

    registerServices(service: Service[], targetContainer?: Service[]) : void {
        service.forEach(element => {
            Logger.log(`${element.getServiceName()} Registered Successfully`, true, true);
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
                    Logger.log(`${service.getServiceName()} Started Successfully`, true, true);
                    service.updateRunningStatus( true );
                    service.start();
                }
            });
        } else {
            ServiceController.serviceContainer.forEach(service => {
                if (!service.isRunning()) {
                    Logger.log(`${service.getServiceName()} Started Successfully`, true, true);
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

    stopServices(targetContainer?: Service[]): void {
        if (targetContainer) {
            Logger.log("Attempting To Stop All Services...", true, true);
            targetContainer.forEach(service => {
                if (service.isRunning()){
                    Logger.log(`${service.getServiceName()} Stopped Successfully`, true, true);
                    service.updateRunningStatus( false );
                    service.stop();
                }
          });
        } else {
            Logger.log("Attempting To Stop All Services...", true, true);
            ServiceController.serviceContainer.forEach(service => {
                if (service.isRunning()){
                    Logger.log(`${service.getServiceName()} Stopped Successfully`, true, true);
                    service.updateRunningStatus( false );
                    service.stop();
                }
          });
        }
    }

    listAll(targetContainer?: Service[]):void {
        if (targetContainer) {
            Logger.log('********************************', true,true);
            Logger.log('* Service Name       | Running *', true,true);
            Logger.log('*********************|**********', true,true);
            targetContainer.forEach(service => {
                Logger.log(`${service.getServiceName()}    |${service.isRunning()}`, true,true);
          });
        } else {
            Logger.log('********************************', true,true);
            Logger.log('* Service Name       | Running *', true,true);
            Logger.log('*********************|**********', true,true);
            ServiceController.serviceContainer.forEach(service => {
                Logger.log(`* ${service.getServiceName()}     | ${service.isRunning()}    *`, true,true);
          });
        }
        
    }

    restartAll(targetContainer?: Service[]):void {
        if (targetContainer) {
            Logger.log("Restarting All Services...", true,true);
            targetContainer.forEach(service => {
                if (service.isRunning()){
                    service.updateRunningStatus( false );
                    service.stop();
                    service.updateRunningStatus( true );
                    service.start();
                }
            });
            Logger.log("All Services Restarted", true, true);
        } else {
            Logger.log("Restarting All Services...", true, true);
            ServiceController.serviceContainer.forEach(service => {
                if (service.isRunning()){
                    service.updateRunningStatus( false );
                    service.stop();
                    service.updateRunningStatus( true );
                    service.start();
                }
            });
            Logger.log("All Services Restarted", true,true);
        }
    }

    restartService(serviceName:string) : void {
        const service = ServiceController.FindService(serviceName);
        if (service.isRunning()) {
            service.updateRunningStatus( false );
            service.stop();
            service.updateRunningStatus( true );
            service.start();
        }
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