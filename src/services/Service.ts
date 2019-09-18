export abstract class Service {
    protected _exposeToBackend = false;
    protected _serviceName = "";
    protected readonly STATUS :string[] = [
        'Service Completed With No Error',
        'Service Could Not Complete - Missing Data',
        'Service Could Not Complete - Bad Data'
    ];
    abstract Start() : boolean;
    abstract Stop() : boolean;
    abstract Invoke(): boolean;
    abstract isExposed() :boolean;
    abstract UpdateStatus(input :boolean): void;
    getServiceName():string {
        return this._serviceName;
    }
}