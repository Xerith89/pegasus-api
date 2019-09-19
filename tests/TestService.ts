import { Service } from "../src/core/Service";
import {Model} from '../src/core/Model';


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
           this._logger.log("Model Binding Error");
        }
        this._logger.log(`${this._serviceName} Started... `);
    }    

    public stop() :void {
        this._logger.log(`${this._serviceName} Stopped... `);
    }

    public invoke(req:any, res:any) :any
    {
        if (this._status) {
            this._logger.log(`${this._serviceName} Invoked From ${req.baseUrl}`);
            
            //Signal a successful service call
            this._logger.log("Service Complete Successfully");

            //We are using a contributor function here to build our json response
            return {
                name: req.body.name, 
                age:req.body.age, 
            } ;
        }

        //Service is not running
        this._logger.log("Service Not Running");
        return {
            status: "Service Unavailable"
        };
        
    }

}