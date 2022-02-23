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
exports.PersonMaster = void 0;
var fileIO_1 = require("../util/fileIO");
var Relationship = {
    HONNIN: "\u672C\u4EBA",
    CHICHI: "\u7236",
    HAHA: "\u6BCD",
    SOHU: "\u7956\u7236",
    SOBO: "\u7956\u6BCD",
    GIHU: "\u7FA9\u7236",
    GIBO: "\u7FA9\u6BCD",
    MUSUKO: "\u606F\u5B50",
    MUSUME: "\u5A18"
};
var Sex = {
    MALE: "\u7537",
    WOMAN: "\u5973"
};
var PersonCsvMapping = {
    name: "\u540D\u524D",
    kana: "\u3075\u308A\u304C\u306A",
    sex: "\u6027\u5225",
    age: "\u5E74\u9F62",
    birthday: "\u8A95\u751F\u65E5",
    bloodType: "\u8840\u6DB2\u578B",
    cellPhoneNumber: "\u643A\u5E2F"
};
var convertPersonMst = function (record, index) {
    return {
        name: record[PersonCsvMapping.name],
        kana: record[PersonCsvMapping.kana].replace(/[ぁ-ん]/g, function (s) {
            return String.fromCharCode(s.charCodeAt(0) + 0x60);
        }),
        lastName: record[PersonCsvMapping.name].split(" ")[0],
        firstName: record[PersonCsvMapping.name].split(" ")[1],
        lastKana: record[PersonCsvMapping.kana].replace(/[ぁ-ん]/g, function (s) {
            return String.fromCharCode(s.charCodeAt(0) + 0x60);
        }).split(" ")[0],
        firstKana: record[PersonCsvMapping.kana].replace(/[ぁ-ん]/g, function (s) {
            return String.fromCharCode(s.charCodeAt(0) + 0x60);
        }).split(" ")[1],
        sex: record[PersonCsvMapping.sex],
        age: record[PersonCsvMapping.age],
        birthday: record[PersonCsvMapping.birthday],
        bloodType: record[PersonCsvMapping.bloodType],
        cellPhoneNumber: record[PersonCsvMapping.cellPhoneNumber],
        relationship: Relationship.HONNIN,
        index: index
    };
};
var PersonMaster = /** @class */ (function () {
    function PersonMaster() {
        this.otonas = [];
        this.kodomos = [];
    }
    PersonMaster.prototype.setup = function (otonapath, kodomopath) {
        return __awaiter(this, void 0, void 0, function () {
            var otonaresult, kodomoresult;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, (0, fileIO_1.readCsv)(otonapath, convertPersonMst)];
                    case 1:
                        otonaresult = _c.sent();
                        (_a = this.otonas).splice.apply(_a, __spreadArray([this.otonas.length, 0], otonaresult, false));
                        return [4 /*yield*/, (0, fileIO_1.readCsv)(kodomopath, convertPersonMst)];
                    case 2:
                        kodomoresult = _c.sent();
                        (_b = this.kodomos).splice.apply(_b, __spreadArray([this.kodomos.length, 0], kodomoresult, false));
                        return [2 /*return*/];
                }
            });
        });
    };
    PersonMaster.prototype.getRandomOtona = function () {
        return this.otonas[Math.floor(Math.random() * (this.otonas.length - 1))];
    };
    PersonMaster.prototype.getRandomKodomo = function () {
        return this.kodomos[Math.floor(Math.random() * (this.kodomos.length - 1))];
    };
    PersonMaster.prototype.makeRandomFamilyOtona = function (base) {
        var family = this.getRandomOtona();
        return {
            name: base.lastName + ' ' + family.firstName,
            kana: base.lastKana + ' ' + family.firstKana,
            lastName: base.lastName,
            firstName: family.firstName,
            lastKana: base.lastKana,
            firstKana: family.firstKana,
            sex: family.sex,
            age: family.age,
            birthday: family.birthday,
            bloodType: family.bloodType,
            cellPhoneNumber: family.cellPhoneNumber,
            relationship: family.sex == Sex.MALE ? Relationship.CHICHI : Relationship.HAHA,
            index: family.index
        };
    };
    PersonMaster.prototype.makeRandomFamilySohuSobo = function (base) {
        var family = this.getRandomOtona();
        return {
            name: base.lastName + ' ' + family.firstName,
            kana: base.lastKana + ' ' + family.firstKana,
            lastName: base.lastName,
            firstName: family.firstName,
            lastKana: base.lastKana,
            firstKana: family.firstKana,
            sex: family.sex,
            age: family.age,
            birthday: family.birthday,
            bloodType: family.bloodType,
            cellPhoneNumber: family.cellPhoneNumber,
            relationship: family.sex == Sex.MALE ? Relationship.SOHU : Relationship.SOBO,
            index: family.index
        };
    };
    PersonMaster.prototype.makeRandomFamilyKodomo = function (base) {
        var family = this.getRandomKodomo();
        return {
            name: base.lastName + ' ' + family.firstName,
            kana: base.lastKana + ' ' + family.firstKana,
            lastName: base.lastName,
            firstName: family.firstName,
            lastKana: base.lastKana,
            firstKana: family.firstKana,
            sex: family.sex,
            age: family.age,
            birthday: family.birthday,
            bloodType: family.bloodType,
            cellPhoneNumber: family.cellPhoneNumber,
            relationship: family.sex == Sex.MALE ? Relationship.MUSUKO : Relationship.MUSUME,
            index: family.index
        };
    };
    PersonMaster.prototype.makeRandomFamilyTataiji = function (base) {
        var family = this.getRandomKodomo();
        return {
            name: base.lastName + ' ' + family.firstName,
            kana: base.lastKana + ' ' + family.firstKana,
            lastName: base.lastName,
            firstName: family.firstName,
            lastKana: base.lastKana,
            firstKana: family.firstKana,
            sex: family.sex,
            age: base.age,
            birthday: base.birthday,
            bloodType: family.bloodType,
            cellPhoneNumber: base.cellPhoneNumber,
            relationship: base.relationship,
            index: family.index
        };
    };
    return PersonMaster;
}());
exports.PersonMaster = PersonMaster;
