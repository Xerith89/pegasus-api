import { Model } from "../models/Model";

export default class FlatSchemeModel implements Model {
    constructor() {} 

    postCode: string = "";
    declaredValue: number = 0;
}