import {Service} from './Service'
import Logger from './Logger';

export default class ServiceController {


    private static serviceContainer : Service[] = [];

    registerServices(service: Service[], targetContainer: Service[] = ServiceController.serviceContainer) : void {
        service.forEach(element => {
            Logger.log(`${element.getServiceName()} Registered Successfully`, true, true);
        targetContainer.push(element);
        }); 
    }

    startServices(targetContainer: Service[] = ServiceController.serviceContainer) : void {
        targetContainer.forEach(service => {
            if (!service.isRunning()) {
                Logger.log(`${service.getServiceName()} Started Successfully`, true, true);
                service.updateRunningStatus( true );
                service.start();
            }
        });
    }

    startService(serviceName:string, targetContainer: Service[] = ServiceController.serviceContainer) : void {
        const service = ServiceController.FindService(serviceName, targetContainer);
        service.updateRunningStatus( true );
        service.start();
    }

    stopService(serviceName:string, targetContainer: Service[] = ServiceController.serviceContainer) : void {
        const service = ServiceController.FindService(serviceName, targetContainer);
        service.updateRunningStatus( false );
        service.stop();
     }

    stopServices(targetContainer: Service[] = ServiceController.serviceContainer): void {
        Logger.log("Attempting To Stop All Services...", true, true);
        targetContainer.forEach(service => {
            if (service.isRunning()){
                Logger.log(`${service.getServiceName()} Stopped Successfully`, true, true);
                service.updateRunningStatus( false );
                service.stop();
            }
        });
    }

    listAll(targetContainer: Service[] = ServiceController.serviceContainer):void {
        Logger.log('********************************', true,true);
        Logger.log('* Service Name       | Running *', true,true);
        Logger.log('*********************|**********', true,true);
        targetContainer.forEach(service => {
            Logger.log(`${service.getServiceName()}    |${service.isRunning()}`, true,true);
        });
    }

    restartAll(targetContainer: Service[] = ServiceController.serviceContainer):void {
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

    static FindService(serviceName :string, targetContainer: Service[] = ServiceController.serviceContainer) : any {
        return targetContainer.find((element) => {
            return serviceName === element.getServiceName();
        });
    }

   
}