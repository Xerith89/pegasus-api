
export abstract class Service {
    protected _exposeToBackend = false;
    protected _serviceName = "";
    protected _status = false;

    protected _attributes: {} = {};
    constructor(atttributes: {}){
        this._attributes = atttributes;

    }

    abstract start() : void;
    abstract stop() : void;
    abstract invoke(req: any, res:any): {};

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