import error from '../methods/error';
import isNull from '../methods/isNull';

export default function _typeCheck(obj: any, cls: any, backward_compatible?: boolean): boolean {
    try {
        if (isNull(obj)) { return false; }
        if (backward_compatible) { return obj.constructor.name == cls; }
        return obj.constructor == cls;
    } catch (e) {
        /* istanbul ignore next */
        error && error('is' + cls.constructor.name, e);
        /* istanbul ignore next */
        return null;
    }
}