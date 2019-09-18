import { Service } from "../services/Service";
import {Model} from '../services/Model';
import Logger from "../services/Logger";
import sayHello from '../contributors/ExampleContributor';

export default class ExampleScheme extends Service {
    private _model :Model;
    private _logger :Logger;

    constructor(model : Model, serviceName: string) {
        super()
        this._model = model;
        //We want this to be a valid URL endpoint
        this._exposeToBackend = true;
        this._serviceName = serviceName;
        this._logger = new Logger();

        ///Service Constants Go Here
        
    }

    private _running :boolean = false;
   
    //attempt to start the service and bind the model
    public Start() :boolean  {
        if (this._model === null) {
           this._logger.log("Model Binding Error");
            return false;
        }

        this._logger.log(`${this._serviceName} Started... `);
        return true;
    }    

    public Stop() :boolean {
        this._logger.log(`${this._serviceName} Stopped... `);
        return false;
    }

    public UpdateStatus(input : boolean) :void {
        this._running = input;
    }

    public Invoke(req:any, res:any) :any
    {
        if (this._running) {
            this._logger.log(`${this._serviceName} Invoked From ${req.baseUrl}`);
            
            //Signal a successful service call
            this._logger.log(this.STATUS[0]);

            //We are returning a string that will be sent as a response but you can build and send any kind of response
            //We are using a contributor function here
            return `${sayHello(req.body.name)}, you are ${req.body.age} years old`;
        }

        //Service is not running
        this._logger.log(this.STATUS[3]);
        return false;
        
    }

    public isExposed() :boolean{
        return this._exposeToBackend;
    }

    //Check that the model data is within the body of the request
    private validateInput(req: any) :boolean {
        for (let [key] of Object.entries(this._model.getModel())) {
            if (!req.body.hasOwnProperty(key))
                return false;
        }
        return true;
    }

}