import { Model } from "../core/Model";

export default class ExampleServiceModel implements Model {
    
    getModel(): object {
        return this.attributes;
    }
    constructor() {} 

    attributes:object = {
        name: "",
        age: 0
    }

}