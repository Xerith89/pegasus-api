import { Service } from "../services/Service";
import {Model} from '../models/Model';

export default class FlatScheme extends Service {
    private _model :Model;
    constructor(model : Model) {
        super()
        this._model = model;
    }

    private running :boolean = false;
   
    
    //attempt to start the service and bind the model
    public Start() :boolean  {
        if (this._model === null) {
            console.log("Flat Scheme Could Not Be Started, Model Binding Error");
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
        this.running = input;
    }

    public Invoke() :boolean
    {
        throw "Not Implemented";
        
    }

}