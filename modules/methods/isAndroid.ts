import error from './error';

export default function isAndroid(this: Craydent | Window) {
    /*|{
        "info": "Check if device is Android",
        "category": "HTTP",
        "parameters":[],

        "overloads":[],

        "url": "http://www.craydent.com/library/1.9.3/docs#isAndroid",
        "returnType": "(Bool)"
    }|*/
    try {
        return (/android/i.test(this.navigator.userAgent));
    } catch (e) {
        error && error('isAndroid', e);
    }
}