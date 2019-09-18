export abstract class Service {
    protected _exposeToBackend = false;
    protected _serviceName = "";
    protected readonly STATUS :string[] = [
        'Service Completed Successfully',
        'Service Could Not Complete - Missing Data',
        'Service Could Not Complete - Bad Data',
        'Error - Service Not Running'
    ];
    abstract Start() : boolean;
    abstract Stop() : boolean;
    abstract Invoke(req: any, res:any): any;
    abstract isExposed() :boolean;
    abstract UpdateStatus(input :boolean): void;
    getServiceName():string {
        return this._serviceName;
    }
}