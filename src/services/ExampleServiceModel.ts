import { Model } from "../core/Model";

export default class ExampleServiceModel implements Model {
    
    getModel(): {} {
        return this.attributes;
    }
    constructor() {} 

    attributes:object = {
        name: "",
        age: 0
    }

}