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
var makeReserveData_1 = require("./make/makeReserveData");
var CalendarMaster_1 = require("./master/CalendarMaster");
var ChildrenMaster_1 = require("./master/ChildrenMaster");
var reservetime_1 = require("./types/reservetime");
var filesIO_1 = require("./utils/filesIO");
var makesource_1 = require("./utils/makesource");
var CALENDAR_PATH = "/Users/yamaguchitakeshi/slk/gitwork/maketestdata/master/calendarmst.csv";
var CHILDREN_PATH = "/Users/yamaguchitakeshi/slk/gitwork/maketestdata/master/reserve/children.json";
/* param area */
var FACILITY_ID = 'a10035';
var ACTIVITY_USER_ID = 'afb530ae-a1e7-477c-aab5-9a779603e2d6';
var START_RESERVE_NO = 6;
var SQL_EXPORT_PATH = "/Users/yamaguchitakeshi/slk/gitwork/maketestdata/master/reserve/exportsql/";
var CSV_EXPORT_PATH = "/Users/yamaguchitakeshi/slk/gitwork/maketestdata/master/reserve/exportcsv/";
function makeEntitySource() {
    return __awaiter(this, void 0, void 0, function () {
        var jsonsource;
        return __generator(this, function (_a) {
            jsonsource = new makesource_1.JsonPathToSource();
            jsonsource.makeInterfaceSource('use_reservation', "/Users/yamaguchitakeshi/slk/gitwork/maketestdata/master/reserve/basic/use_reservation.json");
            return [2 /*return*/];
        });
    });
}
function makeBasicData() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, makesource_1.JsonToBasicSouce.makeJsonToBasicSource('use_reservation', "/Users/yamaguchitakeshi/slk/gitwork/maketestdata/master/reserve/basic/use_reservation.json")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // makeEntitySource();
            // makeBasicData();
            makeReserveDatas();
            return [2 /*return*/];
        });
    });
}
function makeReserveDatas() {
    return __awaiter(this, void 0, void 0, function () {
        var childrenMaster, maker, targetDays;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('start make reserve datas');
                    childrenMaster = new ChildrenMaster_1.ChildrenMaster();
                    return [4 /*yield*/, childrenMaster.setup(CHILDREN_PATH)];
                case 1:
                    _a.sent();
                    maker = new makeReserveData_1.ReserveDataMaker(ACTIVITY_USER_ID, FACILITY_ID, childrenMaster, START_RESERVE_NO);
                    return [4 /*yield*/, loadTargetDays()];
                case 2:
                    targetDays = _a.sent();
                    targetDays.filter(function (day) { return day.holiday == 0; })
                        .filter(function (day) { return day.day_of_week != '土'; })
                        .filter(function (day) { return day.day_of_week != '日'; })
                        .forEach(function (day) { return makeReserveData(maker, day.date); });
                    (0, filesIO_1.exportSql)(SQL_EXPORT_PATH, 'use_reservation', maker.getDataStore().getReserveData());
                    (0, filesIO_1.exportSql)(SQL_EXPORT_PATH, 'usage_record', maker.getDataStore().getFixdata());
                    (0, filesIO_1.exportCSV)(CSV_EXPORT_PATH, 'use_reservation', maker.getDataStore().getReserveData());
                    (0, filesIO_1.exportCSV)(CSV_EXPORT_PATH, 'usage_record', maker.getDataStore().getFixdata());
                    // console.log(maker.getDataStore().getReserveData());
                    // console.log(maker.getDataStore().getFixdata());
                    console.log('end make reserve datas');
                    return [2 /*return*/];
            }
        });
    });
}
function loadTargetDays() {
    return __awaiter(this, void 0, void 0, function () {
        var calendarmst;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    calendarmst = new CalendarMaster_1.CalendarMaster();
                    return [4 /*yield*/, calendarmst.setup(CALENDAR_PATH)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            resolve(calendarmst.getCalendar());
                        })];
            }
        });
    });
}
;
function makeReserveData(maker, date) {
    var childrenOneDay = new Array();
    var makeCount = (0, reservetime_1.get1DayCount)(date);
    for (var i = 0; i < makeCount; i++) {
        maker.make(date, childrenOneDay);
    }
}
