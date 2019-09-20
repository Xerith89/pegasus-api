import { Service } from "../src/core/Service";
import sayHello from '../src/contributors/ExampleContributor';
import Logger from '../src/core/Logger'

export default class TestService extends Service {
 
    constructor(attributes: {}, serviceName: string, exposeToBackend :boolean) {
        super(attributes)
        //Assign member data
        this._exposeToBackend = exposeToBackend;
        this._serviceName = serviceName;
    }

    //attempt to start the service and bind the model
    public start() :void  {
        Logger.log(`${this._serviceName} Started... `, true, true);
    }    

    public stop() :void {
        Logger.log(`${this._serviceName} Stopped... `, true, true);
    }

    public invoke(req:any, res:any) :any
    {
        if (this._status) {
            Logger.log(`${this._serviceName} Invoked From ${req.baseUrl}`, true,true);
            
            //Signal a successful service call
            Logger.log("Service Complete Successfully", true, true);

            //We are using a contributor function here to build our json response
            return this._attributes = {
                name: req.body.name, 
                age:req.body.age, 
                message: sayHello(req.body.name)
            } ;
        }

        //Service is not running
        Logger.log("Service Not Running", true, true);
        return {
            status: "Service Unavailable"
        };
        
    }

}