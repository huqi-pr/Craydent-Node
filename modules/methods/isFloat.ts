import _typeCheck from '../protected/_typeCheck'
import isNull from '../methods/isNull';
import isNumber from '../methods/isNumber';
import isArray from '../methods/isArray';

export default function isFloat(obj: any): boolean {
    /*|{
        "info": "Object class extension to check if object is a float",
        "category": "Object|TypeOf",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#object.isFloat",
        "returnType": "(Bool)"
    }|*/
    if (isNull(obj) || isArray(obj)) { return false; }
    return (isNumber(obj) && parseFloat(obj) == obj);
}