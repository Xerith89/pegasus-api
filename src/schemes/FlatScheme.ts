import { Service } from "../services/Service";
import {Model} from '../services/Model';
import Logger from "../services/Logger";

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

        this._logger.log("Flat Scheme Service Started...");
        return true;
    }    

    public Stop() :boolean {
        this._logger.log("Flat Scheme Service Stopped...");
        return false;
    }

    public UpdateStatus(input : boolean) :void {
        this._running = input;
    }

    public Invoke(req:any, res:any) :boolean
    {
        if (this._running) {
            this._logger.log(`Service Invoked From ${req.baseUrl}`);
            
            //Signal a successful service call
            this._logger.log(this.STATUS[0]);
            return true;
        }
        //Service failed
        return false;
        
    }

    public isExposed() :boolean{
        return this._exposeToBackend;
    }

}