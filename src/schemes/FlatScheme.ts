import { Service } from "../services/Service";
import {Model} from '../services/Model';
import Logger from "../services/Logger";
import ServiceController from "../services/ServiceController";

export default class FlatScheme extends Service {
    private _model :Model;
    private _logger :Logger;

    constructor(model : Model, serviceName: string) {
        super()
        this._model = model;
        //We want this to be a valid URL endpoint
        this._exposeToBackend = true;
        this._serviceName = serviceName;
        this._logger = new Logger();
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
            let myScheme : Service = ServiceController.FindService('myscheme');
            let result:number = myScheme.Invoke(req,res);
            //Signal a successful service call
            this._logger.log(this.STATUS[0]);
            return result;
        }
        //Service failed
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