export abstract class Service {
    protected _exposeToBackend = false;
    protected _serviceName = "";
    protected _status = false;
    protected _model:object = {};
    
    constructor(model: any){
        this._model = model.getModel();
    }

    abstract Start() : void;
    abstract Stop() : void;
    abstract Invoke(req: any, res:any): any;

    //Check that the model data is within the body of the request
    protected validateInput(req: any) :boolean {
        for (let [key] of Object.entries(this._model)) {
            if (!req.body.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }

    isExposed() :boolean {
        return this._exposeToBackend;
     }
    updateRunningStatus(input :boolean): void {
        this._status = input;
    }
    getServiceName():string {
        return this._serviceName;
    }

    
}