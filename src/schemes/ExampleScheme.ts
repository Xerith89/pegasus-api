import { Service } from "../services/Service";
import {Model} from '../services/Model';
import Logger from "../services/Logger";
import sayHello from '../contributors/ExampleContributor';

export default class ExampleScheme extends Service {
 
    private _logger :Logger;

    constructor(model : Model, serviceName: string, exposeToBackend :boolean) {
        super(model)
        //We want this to be a valid URL endpoint
        this._exposeToBackend = exposeToBackend;
        this._serviceName = serviceName;
        this._logger = new Logger();

        ///Service Constants Go Here
        
    }

    //attempt to start the service and bind the model
    public Start() :void  {
        if (this._model === null) {
           this._logger.log("Model Binding Error");
        }
        this._logger.log(`${this._serviceName} Started... `);
    }    

    public Stop() :void {
        this._logger.log(`${this._serviceName} Stopped... `);
    }

    public Invoke(req:any, res:any) :any
    {
        if (this._status) {
            this._logger.log(`${this._serviceName} Invoked From ${req.baseUrl}`);
            
            //Signal a successful service call
            this._logger.log("Service Complete Successfully");

            //We are using a contributor function here to build our json response
            return {
                name: req.body.name, 
                age:req.body.age, 
                message: sayHello(req.body.name)
            } ;
        }

        //Service is not running
        this._logger.log("Service Not Running");
        return false;
        
    }

}