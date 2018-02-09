/*/---------------------------------------------------------/*/
/*/ Craydent LLC node-v0.8.2                                /*/
/*/ Copyright 2011 (http://craydent.com/about)              /*/
/*/ Dual licensed under the MIT or GPL Version 2 licenses.  /*/
/*/ (http://craydent.com/license)                           /*/
/*/---------------------------------------------------------/*/
/*/---------------------------------------------------------/*/
var $c = global.$c || {},
    _syncroit = $c.syncroit,
    _isArray = $c.isArray,
    _isFunction = $c.isFunction,
    _isAsync = $c.isAsync,
    _isGenerator = $c.isGenerator,
    _isPromise = $c.isPromise,
    _error = $c.error;

function parallelEach(obj, gen, args) {
    try {
        var self = obj, arr = obj;
        if (_isArray(gen)) {
            args = gen;
            gen = undefined;
        }
        if (!_isArray(args)) {
            args = [];
        }
        var len = arr.length, results = Array(len), completed = 0;
        if (!len) { return new Promise(function (res) { res(results); }); }
        if (gen) {
            var isgen = _isGenerator(gen), isfunc = _isFunction(gen), isasync = _isAsync(gen);
            return new Promise(function (res, rej) {
                for (var i = 0; i < len; i++) {
                    if (isgen) {
                        eval('_syncroit(function*(){ results[' + i + '] = yield* gen.call(self, arr[' + i + '],' + i + '); if (++completed == len) { res(results); } });');
                    } else if (isasync) {
                        eval('(async function (){ results[' + i + '] = await gen.call(self, arr[' + i + '],' + i + '); if (++completed == len) { res(results); } })();');
                    } else if (isfunc) {
                        results[i] = gen.call(self,arr[i],i);
                        if (++completed == len) { res(results); }
                    }
                }
            });
        }
        return new Promise(function (res, rej) {
            for (var i = 0; i < len; i++) {
                if (_isGenerator(arr[i])) {
                    eval('_syncroit(function*(){ results[' + i + '] = yield* arr[' + i + '].apply(self,args); if (++completed == len) { res(results); } });');
                } else if (_isAsync(arr[i])) {
                    eval('(async function () { results[' + i + '] = await arr[' + i + ']; if (++completed == len) { res(results); } })();');
                } else if (_isPromise(arr[i])) {
                    eval('_syncroit(function*(){ results[' + i + '] = yield arr[' + i + ']; if (++completed == len) { res(results); } });');
                } else if (_isFunction(arr[i])) {
                    eval('setTimeout(function(){ results[' + i + '] = arr[' + i + '].apply(self,args);if (++completed == len) { res(results); } },0);');
                } else {
                    results[i] = arr[i];
                    if (++completed == len) { res(results); }
                }
            }
        });
    } catch(e) {
        _error && _error("Array.parallelEach", e);
    }
}

function init (ctx) {
    if (!ctx.isEmpty) { return; }
    $c = ctx.isEmpty($c) ? ctx : $c;
    _syncroit = ctx.syncroit || $c.syncroit;
    _isArray = ctx.isArray || $c.isArray;
    _isFunction = ctx.isFunction || $c.isFunction;
    _isAsync = ctx.isAsync || $c.isAsync;
    _isGenerator = ctx.isGenerator || $c.isGenerator;
    _isPromise = ctx.isPromise || $c.isPromise;
    _error = ctx.error || $c.error;

    ctx.parallelEach = ctx.hasOwnProperty('parallelEach') && ctx.parallelEach || parallelEach;
    if ($c !== ctx) {
        $c.parallelEach = $c.hasOwnProperty('parallelEach') && $c.parallelEach || ctx.parallelEach
    }
}
init.parallelEach = parallelEach;
module.exports = init;
