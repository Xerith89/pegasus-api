import { Model } from "../services/Model";

export default class FlatSchemeModel implements Model {
    getModel(): object {
        return this.attributes;
    }

    attributes :object = {
        name: "Alex"
    }
    constructor() {} 

    responses :string[] = [
       'My Scheme'
    ];
}