import error from '../methods/error';
import isObject from '../methods/isObject';

export default function normalize<T, TResult>(arr: T[]): TResult[] {
    /*|{
        "info": "Array class extension to normalize all properties in the object array",
        "category": "Array",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#array.normalize",
        "typeParameter": "<T, TResult>",
        "returnType": "(Array<TResult>) returns a normalized version of the objects."
    }|*/
    try {
        let allProps = {} as any, arrObj = [], len = arr.length;
        for (let i = 0; i < len; i++) {
            let json = arr[i];
            if (!isObject(json)) {
                error && error("normalize", { description: `index: ${i} (skipped) is not an object` } as any);
                continue;
            }
            for (let prop in json) {
                /* istanbul ignore else */
                if (json.hasOwnProperty(prop)) {
                    allProps[prop] = 1;
                }
            }
        }
        for (let i = 0; i < len; i++) {
            for (let prop in allProps) {
                if (!isObject(arr[i])) { continue; }
                /* istanbul ignore if */
                if (!allProps.hasOwnProperty(prop)) { continue; }
                arr[i][prop] = arr[i][prop] || null;
            }
            arrObj.push(arr[i]);
        }
        return arrObj;
    } catch (e) /* istanbul ignore next */ {
        error && error("Array.normalize", e);
        return [];
    }
}