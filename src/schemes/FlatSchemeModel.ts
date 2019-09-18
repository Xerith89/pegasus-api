import { Model } from "../services/Model";

export default class FlatSchemeModel implements Model {
    
    getModel(): object {
        return this.attributes;
    }
    constructor() {} 

    attributes:object = {
        postCode:  "",
        declaredValue:  0,
    }

    responses :string[] = [
        'Quote Returned Successfully',
        'Post Code Unacceptable',
        'Declared Value Outside Of Quotable Range',
    ];
}