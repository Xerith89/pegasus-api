
export abstract class Service {
    private _exposeToBackend = false;
    private _serviceName = "";
    private _status = false;

    protected _attributes: {} = {};
    constructor(attributes: {}, serviceName:string, exposeToBackend:boolean){
        this._attributes = attributes;
        this._serviceName = serviceName;
        this._exposeToBackend = exposeToBackend;
    }

    abstract start() : void;
    abstract stop() : void;
    abstract async invoke(req: any, res:any):Promise<{}>

    //Check that if we have attributes then they are in the request body
    protected validateInput(req: any) :boolean {
        for (let [key] of Object.entries(this._attributes)) {
            if (!req.body.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
    
    isExposed() :boolean {
        return this._exposeToBackend;
    }

    isRunning() :boolean {
        return this._status;
    }

    updateRunningStatus(input :boolean): void {
        this._status = input;
    }

    getServiceName():string {
        return this._serviceName;
    }

    
}