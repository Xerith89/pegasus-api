export abstract class Service {
    protected _exposeToBackend = false;
    protected _serviceName = "";
    protected _status = false;
    protected _model:object = {};
    protected readonly STATUS :string[] = [
        'Service Completed Successfully',
        'Service Could Not Complete - Bad Data',
        'Error - Service Not Running'
    ];

    constructor(model: any){
        this._model = model.getModel();
    }

    abstract Start() : boolean;
    abstract Stop() : boolean;
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
    updateStatus(input :boolean): void {
        this._status = input;
    }
    getServiceName():string {
        return this._serviceName;
    }

    
}