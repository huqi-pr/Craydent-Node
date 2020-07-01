import error from './error';
import _getFuncArgs from '../protected/_getFuncArgs';

export default function (fn: Function): string[] {
    /*|{
        "info": "Function class extension to get parameters in definition",
        "category": "Function",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#function.getParameters",
        "typeParameter": "<T>",
        "returnType": "(Array<T>)"
    }|*/
    try {
        return _getFuncArgs(fn);
    } catch (e) {
        error && error("Function.getParameters", e);
    }
}