import error from '../methods/error';
import _addToIndex from '../protected/_addToIndex';
import { IndexedArray } from '../models/Arrays';


export default function insertBefore<T>(arr: T[], index: number, value: any): boolean {
    /*|{
        "info": "Array class extension to add to the array before a specific index",
        "category": "Array",
        "parameters":[
            {"index": "(Int) Index to add before"},
            {"value": "(any) Value to add"}],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.insertBefore",
        "typeParameter": "<T>",
        "returnType": "(Bool) returns true for success and false for failure."
    }|*/
    try {
        let objs = arr as IndexedArray<T>
        objs.splice(index, 0, value);
        if (objs.__indexed_buckets) {
            _addToIndex(objs.__indexed_buckets, value);
        }
        return true;
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.insertBefore", e);
        return null;
    }
}