"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonToSource = void 0;
var JsonToSource = /** @class */ (function () {
    function JsonToSource() {
    }
    JsonToSource.makeInterfaceSourc = function (tableName, json) {
        console.log("export interface " + snakeCaseToClassName(tableName) + " {");
        for (var _i = 0, _a = Object.entries(json); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            console.log("  " + snakeCaseToCamelCase(key) + ": " + typestr(value) + ";");
        }
        console.log("};");
    };
    return JsonToSource;
}());
exports.JsonToSource = JsonToSource;
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
function snakeCaseToCamelCase(userInput) {
    var userOutPut = '';
    var userInputSplit = userInput.split('_');
    var x = 0;
    for (var _i = 0, userInputSplit_2 = userInputSplit; _i < userInputSplit_2.length; _i++) {
        var prm = userInputSplit_2[_i];
        if (x === 0) {
            userOutPut = prm.toLowerCase();
        }
        else {
            userOutPut += prm.substr(0, 1).toUpperCase() + prm.substr(1).toLowerCase();
        }
        x++;
    }
    return userOutPut;
}
