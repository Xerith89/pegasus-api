import { Model } from "../services/Model";

export default class FlatSchemeModel implements Model {
    constructor() {} 

    postCode: string = "";
    declaredValue: number = 0;

    responses :string[] = [
        'Quote Returned Successfully',
        'Post Code Unacceptable',
        'Declared Value Outside Of Quotable Range',
    ];
}