import { Service } from "../core/Service";
import sayHello from '../contributors/ExampleContributor';
import Logger from '../core/Logger'

export default class ExampleService extends Service {
 
    constructor(attributes: {}, serviceName: string, exposeToBackend :boolean) {
        super(attributes, serviceName, exposeToBackend)
    }

    //attempt to start the service and bind the model
    public start() :void  {
        Logger.log(`${this.getServiceName()} Started... `, true, true);
    }    

    public stop() :void {
        Logger.log(`${this.getServiceName()} Stopped... `, true, true);
    }

    public invoke(req:any, res:any) :any
    {
        if (this.isRunning()) {
            Logger.log(`${this.getServiceName()} Invoked From ${req.baseUrl} with ${JSON.stringify(this._attributes)}`, true,true);
            
            //We are using a contributor function here to build our json response
            const response =  {
                name: req.body.name, 
                age:req.body.age, 
                message: sayHello(req.body.name)
            } ;

            //Signal a successful service call
            Logger.log(`Service Complete Successfully - response: ${JSON.stringify(response)}`, true, true);
            return response
        }

        //Service is not running
        Logger.log("Service Not Running", true, true);
        return {
            status: "Service Unavailable"
        };
        
    }

}