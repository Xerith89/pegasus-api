var fs = require("fs");

export default class Logger {
 
    
    static log(input :string, writeToFile:boolean, writeToConsole:boolean) {
        const today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        if (writeToFile) {
            fs.appendFile(`logs/${date}log.txt`, `${time} ${input}\r`, function(err:any){
            });
        }

        if (writeToConsole) {
            console.log(input);
        }
    }
}