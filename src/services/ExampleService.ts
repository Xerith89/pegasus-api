import { Service } from "../core/Service";
import {Model} from '../core/Model';
import sayHello from '../contributors/ExampleContributor';
import Logger from '../core/Logger'

export default class ExampleScheme extends Service {
 
    constructor(model : Model, serviceName: string, exposeToBackend :boolean) {
        super(model)
        //Assign member data
        this._exposeToBackend = exposeToBackend;
        this._serviceName = serviceName;
    }

    //attempt to start the service and bind the model
    public start() :void  {
        if (this._model === null) {
           Logger.log("Model Binding Error", true, true);
        }
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
            return {
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