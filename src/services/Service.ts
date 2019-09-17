export abstract class Service {
    abstract Start() : boolean;
    abstract Stop() : boolean;
    abstract Invoke(): boolean;
    abstract UpdateStatus(input :boolean): void;
}