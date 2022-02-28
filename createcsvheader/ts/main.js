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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
var fs = __importStar(require("fs"));
var readline = __importStar(require("readline"));
var jyusyomst_1 = require("./master/jyusyomst");
var psersonmst_1 = require("./master/psersonmst");
var idmanagement_1 = require("./make/idmanagement");
var familymaker_1 = require("./make/familymaker");
var familiesmaker_1 = require("./make/familiesmaker");
var jsonToSource_1 = require("./util/jsonToSource");
var entity_1 = require("./dto/entity");
var useridmst_1 = require("./master/useridmst");
var fileIO_1 = require("./util/fileIO");
var mendantargetmst_1 = require("./master/mendantargetmst");
var mendanusermaker_1 = require("./make/mendanusermaker");
var spreasonsumpplemeter_1 = require("./supplements/spreasonsumpplemeter");
// マスタ読み込みパス
var JYUSYO_PATH = "/Users/yamaguchitakeshi/slk/gitwork/maketestdata/master/yubin_hama.csv";
var OTONA_PATH = "/Users/yamaguchitakeshi/slk/gitwork/maketestdata/master/otona.csv";
var KODOMO_PATH = "/Users/yamaguchitakeshi/slk/gitwork/maketestdata/master/kodomo.csv";
var EXPORT_SQL_PATH = '/Users/yamaguchitakeshi/slk/gitwork/maketestdata/exportsql/';
var EXPORT_MENDAN_SQL_PATH = '/Users/yamaguchitakeshi/slk/gitwork/maketestdata/exportsql/mendan/';
var EXPORT_CSV_PATH = '/Users/yamaguchitakeshi/slk/gitwork/maketestdata/exportcsv/';
//------------- PARAM ------------------
var USERID_PATH = "/Users/yamaguchitakeshi/slk/gitwork/maketestdata/master/userid_mst.json";
// staging facilityId
var STAGING_FACILITY_ID = 'a10041';
//------------- PARAM ------------------
var PARAM_INTERVIEW_NO_START_INDEX = 1;
// facilityId
// const PARAM_FACILITY_ID = 'a0005';
// const PARAM_FACILITY_ID = 'a00021';
main();
//-------------------------------------------------------------------
// やること
// 1. userid_mst_a10035.json みたいなデータをWebのツールで csv -> json して配置
// 2. STAGING_FACILITY_ID を設定
// 3. 
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, createFirstUserData()];
                case 1:
                    _a.sent();
                    // createSourceCode();
                    return [4 /*yield*/, createMendanData()];
                case 2:
                    // createSourceCode();
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function createFirstUserData() {
    return __awaiter(this, void 0, void 0, function () {
        var params, jyusyoMaster, personMaster, userIdMaster, interviewNoMaker, famillesMaker, familles, supplementer, users, children, childrendetails, interviews, ObjectsToCsv;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = new familiesmaker_1.FamillesMakerParam(STAGING_FACILITY_ID);
                    // main
                    params.pushPettern(new familiesmaker_1.FamilyMakerType(familymaker_1.FamilyPattern.Children1, 10));
                    params.pushPettern(new familiesmaker_1.FamilyMakerType(familymaker_1.FamilyPattern.Children2, 6));
                    params.pushPettern(new familiesmaker_1.FamilyMakerType(familymaker_1.FamilyPattern.Children3, 4));
                    params.pushPettern(new familiesmaker_1.FamilyMakerType(familymaker_1.FamilyPattern.Futago2, 2));
                    params.pushPettern(new familiesmaker_1.FamilyMakerType(familymaker_1.FamilyPattern.Futago3, 1));
                    params.pushPettern(new familiesmaker_1.FamilyMakerType(familymaker_1.FamilyPattern.Mitsugo3, 1));
                    params.pushPettern(new familiesmaker_1.FamilyMakerType(familymaker_1.FamilyPattern.Mitsugo4, 1));
                    jyusyoMaster = new jyusyomst_1.JyusyoMaster();
                    return [4 /*yield*/, jyusyoMaster.setup(JYUSYO_PATH)];
                case 1:
                    _a.sent();
                    personMaster = new psersonmst_1.PersonMaster();
                    return [4 /*yield*/, personMaster.setup(OTONA_PATH, KODOMO_PATH)];
                case 2:
                    _a.sent();
                    userIdMaster = new useridmst_1.UserIdMaster(STAGING_FACILITY_ID, 0);
                    return [4 /*yield*/, userIdMaster.setup(USERID_PATH)];
                case 3:
                    _a.sent();
                    interviewNoMaker = new idmanagement_1.InterviewNoMaker(PARAM_INTERVIEW_NO_START_INDEX);
                    famillesMaker = new familiesmaker_1.FamillesMaker(jyusyoMaster, personMaster, userIdMaster, interviewNoMaker);
                    familles = famillesMaker.make(params);
                    supplementer = new spreasonsumpplemeter_1.SPReasonSupplementer(familles);
                    supplementer.supplement();
                    users = convertUsers(familles);
                    children = convertChildren(familles);
                    childrendetails = convertChildrenDetail(familles);
                    interviews = convertInterviews(familles);
                    ObjectsToCsv = require('objects-to-csv');
                    return [4 /*yield*/, (0, fileIO_1.exportCSV)(EXPORT_CSV_PATH, 'users', users)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (0, fileIO_1.exportCSV)(EXPORT_CSV_PATH, 'children', children)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, (0, fileIO_1.exportCSV)(EXPORT_CSV_PATH, 'childrendetails', childrendetails)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, (0, fileIO_1.exportCSV)(EXPORT_CSV_PATH, 'interviews', interviews)];
                case 7:
                    _a.sent();
                    exportSqlEntity(EXPORT_SQL_PATH, "users", users);
                    exportSqlEntity(EXPORT_SQL_PATH, "children", children);
                    exportSqlEntity(EXPORT_SQL_PATH, "children_detail", childrendetails);
                    exportSqlEntity(EXPORT_SQL_PATH, "interviews", interviews);
                    return [2 /*return*/];
            }
        });
    });
}
function createMendanData() {
    return __awaiter(this, void 0, void 0, function () {
        var targetMst, targets, jyusyoMaster, personMaster, userIdMaster, interviewNoMaker, famillesMaker, params, familles, users, children, childrendetails, interviews, mendanMaker;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    targetMst = new mendantargetmst_1.MendanTargetMaster();
                    return [4 /*yield*/, targetMst.setup("/Users/yamaguchitakeshi/slk/gitwork/maketestdata/master/reserve/exportcsv/mendan_target.csv")];
                case 1:
                    _a.sent();
                    targets = targetMst.getTargetsDate();
                    jyusyoMaster = new jyusyomst_1.JyusyoMaster();
                    return [4 /*yield*/, jyusyoMaster.setup(JYUSYO_PATH)];
                case 2:
                    _a.sent();
                    personMaster = new psersonmst_1.PersonMaster();
                    return [4 /*yield*/, personMaster.setup(OTONA_PATH, KODOMO_PATH)];
                case 3:
                    _a.sent();
                    userIdMaster = new useridmst_1.UserIdMaster(STAGING_FACILITY_ID, 26);
                    return [4 /*yield*/, userIdMaster.setup(USERID_PATH)];
                case 4:
                    _a.sent();
                    interviewNoMaker = new idmanagement_1.InterviewNoMaker(PARAM_INTERVIEW_NO_START_INDEX);
                    famillesMaker = new familiesmaker_1.FamillesMaker(jyusyoMaster, personMaster, userIdMaster, interviewNoMaker);
                    params = new familiesmaker_1.FamillesMakerParam(STAGING_FACILITY_ID);
                    params.pushPettern(new familiesmaker_1.FamilyMakerType(familymaker_1.FamilyPattern.Children1, targets.length));
                    familles = famillesMaker.make(params);
                    users = convertUsers(familles);
                    children = convertChildren(familles);
                    childrendetails = convertChildrenDetail(familles);
                    interviews = convertInterviews(familles);
                    mendanMaker = new mendanusermaker_1.MendanMaker(targets, interviews);
                    mendanMaker.make();
                    exportSqlEntity(EXPORT_MENDAN_SQL_PATH, "users", users);
                    exportSqlEntity(EXPORT_MENDAN_SQL_PATH, "children", children);
                    exportSqlEntity(EXPORT_MENDAN_SQL_PATH, "children_detail", childrendetails);
                    exportSqlEntity(EXPORT_MENDAN_SQL_PATH, "interviews", interviews);
                    return [2 /*return*/];
            }
        });
    });
}
function createSourceCode() {
    var csvToJson = require('convert-csv-to-json');
    var json = csvToJson.fieldDeimiter(',').formatValueByType().getJsonFromCsv("/Users/yamaguchitakeshi/slk/gitwork/maketestdata/example/children_detail.csv");
    for (var i = 0; i < json.length; i++) {
        console.log(json[i]);
        jsonToBasicObj(json[i]);
        jsonToSource_1.JsonToSource.makeInterfaceSourc('children_detail', json[i]);
    }
}
var Table = /** @class */ (function () {
    function Table(tblData, columns) {
        this.tblData = tblData;
        this.columns = columns;
    }
    return Table;
}());
exports.Table = Table;
function jsonToBasicObj(json) {
    var map = {};
    Object.keys(json)
        .map(function (key) {
        var columnName = snakeCaseToCamelCase(key);
        map[columnName] = json[key];
    });
    console.log(map);
}
function makeSrc(interviews) {
    console.log("static convertInterviewsEntity(interviews: Interviews): InterviewsEntity {");
    console.log("    return {");
    Object.keys(interviews)
        .map(function (key) {
        console.log("        " + key + ": interviews." + key + ",");
    });
    console.log("    };");
    console.log("};");
}
function makeTable() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    // 読み込みストリーム
                    var stream = fs.createReadStream("/Users/yamaguchitakeshi/slk/gitwork/maketestdata/tablelayout/users.txt");
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
function convertUsers(familles) {
    var result = new Array();
    familles
        .map(function (family) { return entity_1.EntityConverter.convertUsersEntity(family.user); })
        .forEach(function (user) { return result.push(user); });
    return result;
}
function convertChildren(familles) {
    var result = new Array();
    familles
        .map(function (family) { return entity_1.EntityConverter.convertChildrenEntites(family.childrens); })
        .forEach(function (childrens) { return result.splice.apply(result, __spreadArray([result.length, 0], childrens, false)); });
    return result;
}
function convertChildrenDetail(familles) {
    var result = new Array();
    familles
        .map(function (family) { return family.childrendetails; })
        .forEach(function (childrens) { return result.splice.apply(result, __spreadArray([result.length, 0], childrens, false)); });
    return result;
}
function convertInterviews(familles) {
    var result = new Array();
    familles
        .map(function (family) { return entity_1.EntityConverter.convertInterviewsEntites(family.interviews); })
        .forEach(function (interviews) { return result.splice.apply(result, __spreadArray([result.length, 0], interviews, false)); });
    return result;
}
function camelToUnderscore(key) {
    var result = key.replace(/([A-Z])/g, " $1");
    return result.split(' ').join('_').toLowerCase();
}
function exportSqlEntity(prefixpath, tablename, records) {
    // 同期で行う場合
    try {
        var filePath_1 = prefixpath + tablename + '_ins.sql';
        if (fs.existsSync(filePath_1)) {
            var now = Date.now();
            var backupfilepath = prefixpath + '/backup/' + tablename + '_ins.' + now + '.js';
            fs.renameSync(filePath_1, backupfilepath);
        }
        records.forEach(function (record) {
            console.log("");
            var index = 0;
            var sqlcol = 'INSERT INTO `' + tablename + '` (';
            Object.keys(record)
                .forEach(function (key) {
                index += 1;
                if (tablename == 'interviews' && index == 1) {
                    return;
                }
                sqlcol += '`' + camelToUnderscore(key) + '` ,';
            });
            sqlcol = sqlcol.slice(0, -1);
            sqlcol += ' ) VALUES ';
            fs.appendFileSync(filePath_1, sqlcol);
            fs.appendFileSync(filePath_1, '\r\n');
            console.log(sqlcol);
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
            console.log(sqlValue);
        });
    }
    catch (e) {
        console.log(e);
    }
}
