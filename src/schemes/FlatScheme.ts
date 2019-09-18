import { Service } from "../services/Service";
import {Model} from '../services/Model';

export default class FlatScheme extends Service {
    private _model :Model;
    constructor(model : Model, serviceName: string) {
        super()
        this._model = model;
        //We want this to be a valid URL endpoint
        this._exposeToBackend = true;
        this._serviceName = serviceName;
    }

    private _running :boolean = false;
   
    //attempt to start the service and bind the model
    public Start() :boolean  {
        if (this._model === null) {
            console.log("Model Binding Error");
            return false;
        }

        console.log("Flat Scheme Service Started...");
        return true;
    }    

    public Stop() :boolean {
        console.log("Flat Scheme Service Stopped...");
        return false;
    }

    public UpdateStatus(input : boolean) :void {
        this._running = input;
    }

    public Invoke() :boolean
    {
        if (this._running) {
            console.log('Service Invoked');
            
            //Signal a successful service call
            console.log(this.STATUS[0]);
            return true;
        }
        //Service failed
        return false;
        
    }

    public isExposed() :boolean{
        return this._exposeToBackend;
    }

}