"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Table = void 0;
var fs = __importStar(require("fs"));
var readline = __importStar(require("readline"));
var fileIO_1 = require("../ts/util/fileIO");
var Table = /** @class */ (function () {
    function Table(tblData, columns) {
        this.tblData = tblData;
        this.columns = columns;
    }
    return Table;
}());
exports.Table = Table;
main();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var table, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, makeTable()];
                case 1:
                    table = _a.sent();
                    consoleCsvOut(table);
                    consoleTypeSrcOut(table);
                    (0, fileIO_1.readCsv)("/Users/yamaguchitakeshi/slk/demo\u4F5C\u696D/master/yubin_hama.csv");
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function makeTable() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    // ???????????????????????????
                    var stream = fs.createReadStream("/Users/yamaguchitakeshi/slk/demo\u4F5C\u696D/tablelayout/users.txt");
                    var reader = readline.createInterface({ input: stream });
                    var tblData = { tblName: "", caption: "" };
                    var columnlist = [];
                    reader.on("line", function (line) {
                        var columns = line.split(" ");
                        if (columns.length === 2) {
                            tblData = { tblName: columns[1].replace("(", "").replace(")", ""), caption: columns[0] };
                            console.log(tblData.tblName + "  " + tblData.caption);
                        }
                        else {
                            var typestr = columns[2].split("(")[0];
                            var length_1 = columns[2].split("(").length > 1 ? parseInt(columns[2].split("(")[1].replace(")", "")) : 0;
                            var columnData = { columnName: columns[1].replace("(", "").replace(")", ""),
                                caption: columns[0],
                                type: typestr,
                                length: length_1 };
                            console.log(columnData.columnName + "  " + columnData.caption + "  " + columnData.type + "  " + columnData.length);
                            columnlist.push(columnData);
                        }
                    }).on('close', function () {
                        resolve(new Table(tblData, columnlist));
                    }).on('error', function (err) {
                        reject(err);
                    });
                })];
        });
    });
}
;
function consoleCsvOut(table) {
    console.log(table.tblData.tblName + "," + table.tblData.caption);
    // export column
    var colnms = "";
    table.columns.forEach(function (column) {
        colnms += column.columnName;
        colnms += ",";
    });
    console.log(colnms.slice(0, -1));
    // export caption
    var captions = "";
    table.columns.forEach(function (column) {
        captions += column.caption;
        captions += ",";
    });
    console.log(captions.slice(0, -1));
    // export types
    var types = "";
    table.columns.forEach(function (column) {
        types += column.type;
        types += ",";
    });
    console.log(types.slice(0, -1));
    // export length
    var lengths = "";
    table.columns.forEach(function (column) {
        lengths += new String(column.length);
        lengths += ",";
    });
    console.log(lengths.slice(0, -1));
}
function snakeCaseToCamelCase(userInput) {
    var userOutPut = '';
    var userInputSplit = userInput.split('_');
    var x = 0;
    for (var _i = 0, userInputSplit_1 = userInputSplit; _i < userInputSplit_1.length; _i++) {
        var prm = userInputSplit_1[_i];
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
function snakeCaseToClassName(userInput) {
    var userOutPut = '';
    var userInputSplit = userInput.split('_');
    var x = 0;
    for (var _i = 0, userInputSplit_2 = userInputSplit; _i < userInputSplit_2.length; _i++) {
        var prm = userInputSplit_2[_i];
        userOutPut += prm.substr(0, 1).toUpperCase() + prm.substr(1).toLowerCase();
        x++;
    }
    return userOutPut;
}
function convertTypeStr(typeName) {
    if ("VARCHAR" === typeName) {
        return "string";
    }
    else if ("DATE" === typeName) {
        return "string";
    }
    else {
        return "number";
    }
}
function consoleTypeSrcOut(table) {
    console.log("export interface " + snakeCaseToClassName(table.tblData.tblName) + " {");
    table.columns.forEach(function (column) {
        console.log("  " + snakeCaseToCamelCase(column.columnName) + ": " + convertTypeStr(column.type) + ";");
    });
    console.log("};");
}
