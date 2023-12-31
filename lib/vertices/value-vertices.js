"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefinedObjectVertex = exports.ObjectVertex = exports.getWrappedIndex = exports.ArrayVertex = exports.PrimitiveVertex = void 0;
/**
 * Acts as a vertex wrapper for primitive values.
 * @template T
 * @class
 * @implements {ValueVertex<T>}
 */
var PrimitiveVertex = /** @class */ (function () {
    /**
       * @param {Record<ValidKey, V>} value - value to be wrapped by the vertex
       */
    function PrimitiveVertex(value) {
        this.value = value;
    }
    return PrimitiveVertex;
}());
exports.PrimitiveVertex = PrimitiveVertex;
/**
 * Acts as a vertex wrapper for arrays.
 * @template T
 * @class
 * @implements {KeyValueVertex<T[], number, T>}
 */
var ArrayVertex = /** @class */ (function () {
    /**
       * @param {Record<ValidKey, V>} value - array to be wrapped by the vertex
       */
    function ArrayVertex(value) {
        this.value = value;
    }
    Object.defineProperty(ArrayVertex.prototype, "keyProvider", {
        get: function () {
            return this.createKeyIterator();
        },
        enumerable: false,
        configurable: true
    });
    ArrayVertex.prototype.createKeyIterator = function () {
        var index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    index = 0;
                    _a.label = 1;
                case 1:
                    if (!(index < this.value.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, index];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    index++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    ArrayVertex.prototype.getIndexedKey = function (index) {
        return getWrappedIndex(index, this.value.length);
    };
    ArrayVertex.prototype.getKeyValue = function (key) {
        switch (typeof key) {
            case 'number': {
                return this.value[key];
            }
            case 'string': {
                var index = Number(key);
                return this.value[index];
            }
        }
    };
    ArrayVertex.prototype.getKeyIndex = function (key) {
        return key;
    };
    return ArrayVertex;
}());
exports.ArrayVertex = ArrayVertex;
function getWrappedIndex(index, length, clamped) {
    if (clamped === void 0) { clamped = false; }
    if (index < 0) {
        index = length + index;
    }
    if (clamped) {
        if (index >= length) {
            return length - 1;
        }
        if (index < 0) {
            return 0;
        }
    }
    return index;
}
exports.getWrappedIndex = getWrappedIndex;
/**
 * Acts as a vertex wrapper for javascript objects.
 * @template V
 * @class
 * @implements {KeyValueVertex<Record<ValidKey, V>, ValidKey, V>}
 */
var ObjectVertex = /** @class */ (function () {
    /**
       * @param {Record<ValidKey, V>} value - object to be wrapped by the vertex
       */
    function ObjectVertex(value) {
        this.value = value;
    }
    Object.defineProperty(ObjectVertex.prototype, "keyProvider", {
        get: function () {
            return this.createKeyIterator();
        },
        enumerable: false,
        configurable: true
    });
    ObjectVertex.prototype.createKeyIterator = function () {
        var _a, _b, _c, _i, key;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = this.value;
                    _b = [];
                    for (_c in _a)
                        _b.push(_c);
                    _i = 0;
                    _d.label = 1;
                case 1:
                    if (!(_i < _b.length)) return [3 /*break*/, 4];
                    _c = _b[_i];
                    if (!(_c in _a)) return [3 /*break*/, 3];
                    key = _c;
                    return [4 /*yield*/, key];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    ObjectVertex.prototype.getIndexedKey = function (index) {
        if (index >= 0) {
            var count = 0;
            for (var key in this.value) {
                if (count === index) {
                    return key;
                }
                count++;
            }
        }
        var keys = Object.keys(this.value);
        var wrappedIndex = getWrappedIndex(index, keys.length);
        return keys[wrappedIndex];
    };
    ObjectVertex.prototype.getKeyValue = function (key) {
        return this.value[key];
    };
    ObjectVertex.prototype.getKeyIndex = function (key) {
        var count = 0;
        for (var targetKey in this.value) {
            if (targetKey === key) {
                return count;
            }
            count++;
        }
    };
    return ObjectVertex;
}());
exports.ObjectVertex = ObjectVertex;
/**
 * Provides a vertex that lets you specify what properties can be iterac.
 * @template V
 * @class
 * @implements {KeyValueVertex<Record<ValidKey, V>, ValidKey, V>}
 * @property {ValidKey[]} keys - list of property names the vertex can iterate over
 */
var DefinedObjectVertex = /** @class */ (function (_super) {
    __extends(DefinedObjectVertex, _super);
    /**
       * @param {Record<ValidKey, V>} value - object to be wrapped by the vertex
       * @param {ValidKey[]} keys - list of property names the vertex should use
       */
    function DefinedObjectVertex(value, keys) {
        var _this = _super.call(this, value) || this;
        _this.keys = keys;
        return _this;
    }
    DefinedObjectVertex.prototype.createKeyIterator = function () {
        var index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    index = 0;
                    _a.label = 1;
                case 1:
                    if (!(index <= this.keys.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, this.keys[index]];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    index++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    DefinedObjectVertex.prototype.getIndexedKey = function (index) {
        var wrappedIndex = getWrappedIndex(index, this.keys.length);
        return this.keys[wrappedIndex];
    };
    DefinedObjectVertex.prototype.getKeyIndex = function (key) {
        return this.keys.indexOf(key);
    };
    return DefinedObjectVertex;
}(ObjectVertex));
exports.DefinedObjectVertex = DefinedObjectVertex;
