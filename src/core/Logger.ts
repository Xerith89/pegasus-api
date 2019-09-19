import { Stream } from "stream";

var fs = require("fs");

export default class Logger {
 
    
    static log(input :string, writeToFile:boolean, writeToConsole:boolean) {
        if (writeToFile) {
            fs.appendFile("logs/log.txt", `${input}\r`, function(err:any){
            });
        }

        if (writeToConsole) {
            console.log(input);
        }
    }
}