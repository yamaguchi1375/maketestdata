"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.JsonToBasicSouce = exports.JsonPathToSource = exports.JsonToSource = void 0;
var filesIO_1 = require("./filesIO");
function typestr(value) {
    if (isNaN(value)) {
        return 'string';
    }
    else {
        return 'number';
    }
}
function snakeCaseToClassName(userInput) {
    var userOutPut = '';
    var userInputSplit = userInput.split('_');
    var x = 0;
    for (var _i = 0, userInputSplit_1 = userInputSplit; _i < userInputSplit_1.length; _i++) {
        var prm = userInputSplit_1[_i];
        userOutPut += prm.substr(0, 1).toUpperCase() + prm.substr(1).toLowerCase();
        x++;
    }
    return userOutPut;
}
var JsonToSource = /** @class */ (function () {
    function JsonToSource() {
    }
    JsonToSource.makeInterfaceSource = function (tableName, json) {
        console.log("export interface " + snakeCaseToClassName(tableName) + " {");
        for (var _i = 0, _a = Object.entries(json); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            console.log("  " + key + ": " + typestr(value) + ";");
        }
        console.log("};");
    };
    ;
    return JsonToSource;
}());
exports.JsonToSource = JsonToSource;
;
var JsonPathToSource = /** @class */ (function () {
    function JsonPathToSource() {
    }
    JsonPathToSource.prototype.makeInterfaceSource = function (tablseName, path) {
        return __awaiter(this, void 0, void 0, function () {
            var jsons;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, filesIO_1.readJson)(path)];
                    case 1:
                        jsons = _a.sent();
                        JsonToSource.makeInterfaceSource(tablseName, jsons[0]);
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    return JsonPathToSource;
}());
exports.JsonPathToSource = JsonPathToSource;
;
var JsonToBasicSouce = /** @class */ (function () {
    function JsonToBasicSouce() {
    }
    JsonToBasicSouce.makeJsonToBasicSource = function (tablseName, path) {
        return __awaiter(this, void 0, void 0, function () {
            var jsons, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, filesIO_1.readJson)(path)];
                    case 1:
                        jsons = _a.sent();
                        for (i = 0; i < jsons.length; i++) {
                            JsonToBasicSouce.makeSource(tablseName, i + 1, jsons[i]);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    JsonToBasicSouce.makeSource = function (tableNam, index, json) {
        console.log('export let basic' + snakeCaseToClassName(tableNam) + index
            + 'Entity: ' + snakeCaseToClassName(tableNam) + ' = {');
        Object.keys(json)
            .forEach(function (key) {
            var value = json[key];
            if (isNaN(value)) {
                value = "'" + value + "'";
            }
            else if (value == null) {
                value = "'NULL'";
            }
            console.log('    ' + key + ': ' + value + ',');
        });
        console.log('};');
    };
    return JsonToBasicSouce;
}());
exports.JsonToBasicSouce = JsonToBasicSouce;
