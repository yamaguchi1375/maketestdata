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
exports.exportSql = exports.exportCSV = exports.readJson = exports.readCsv = void 0;
var fs = __importStar(require("fs"));
var csv = require('csv-parser');
var readCsv = function (filePath, converter) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var lines = [];
                var index = 0;
                fs.createReadStream(filePath)
                    .pipe(csv())
                    .on('data', function (data) { return lines.push(converter(data, index++)); })
                    .on('end', function () {
                    resolve(lines);
                }).on('error', function (err) {
                    reject(err);
                });
            })];
    });
}); };
exports.readCsv = readCsv;
var readJson = function (filePath) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                fs.readFile(filePath, 'utf-8', function (err, data) {
                    return err ? reject(err) : resolve(JSON.parse(data));
                });
            })];
    });
}); };
exports.readJson = readJson;
var exportCSV = function (path, tablename, records) { return __awaiter(void 0, void 0, void 0, function () {
    var ObjToCSV, csv, filePath, now, backupfilepath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ObjToCSV = require('objects-to-csv');
                csv = new ObjToCSV(records);
                filePath = path + tablename + '.csv';
                if (fs.existsSync(filePath)) {
                    now = Date.now();
                    backupfilepath = path + 'backup/' + tablename + '.' + now + '.csv';
                    fs.renameSync(filePath, backupfilepath);
                }
                // Save to file:
                return [4 /*yield*/, csv.toDisk(filePath)];
            case 1:
                // Save to file:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.exportCSV = exportCSV;
var exportSql = function (path, tablename, records) {
    // 同期で行う場合
    try {
        var filePath_1 = path + tablename + '_ins.sql';
        if (fs.existsSync(filePath_1)) {
            var now = Date.now();
            var backupfilepath = path + 'backup/' + tablename + '_ins.' + now + '.sql';
            fs.renameSync(filePath_1, backupfilepath);
        }
        records.forEach(function (record) {
            var index = 0;
            var sqlcol = 'INSERT INTO `' + tablename + '` (';
            Object.keys(record)
                .forEach(function (key) {
                index += 1;
                sqlcol += '`' + key + '` ,';
            });
            sqlcol = sqlcol.slice(0, -1);
            sqlcol += ' ) VALUES ';
            fs.appendFileSync(filePath_1, sqlcol);
            fs.appendFileSync(filePath_1, '\r\n');
            var sqlValue = '(';
            index = 0;
            Object.values(record)
                .forEach(function (value) {
                index += 1;
                if (tablename == 'interviews' && index == 1) {
                    return;
                }
                if ("NULL" == value) {
                    sqlValue += value;
                }
                else {
                    sqlValue += "'" + value + "'";
                }
                sqlValue += ' ,';
            });
            sqlValue = sqlValue.slice(0, -1);
            sqlValue += '); ';
            fs.appendFileSync(filePath_1, sqlValue);
            fs.appendFileSync(filePath_1, '\r\n');
        });
    }
    catch (e) {
        console.log(e);
    }
};
exports.exportSql = exportSql;
