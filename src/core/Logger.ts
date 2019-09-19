import { Stream } from "stream";

var fs = require("fs");

export default class Logger {
    private _consoleLog:boolean;
    private _textLog:boolean
    constructor(enableConsole:boolean, enableText:boolean) {
        this._consoleLog = enableConsole;
        this._textLog = enableText;
    }
    
    log(input :string) {
        if (this._textLog) {
           const stream =  fs.createWriteStream(`logs/log.txt`);
            stream.once('open', function(fd:any){
                stream.write(input);
                stream.end();
            });
        }

        if (this._consoleLog) {
            console.log(input);
        }
    }
}