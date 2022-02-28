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
exports.UseReservationMaster = void 0;
var filesIO_1 = require("../utils/filesIO");
var converter = function (record, index) {
    return {
        reservation_no: parseInt(record['reservation_no']),
        facility_id: record['facility_id'],
        user_id: record['user_id'],
        child_id: parseInt(record['child_id']),
        usage_date: record['usage_date'],
        use_from_datetime: record['use_from_datetime'],
        use_to_datetime: record['use_to_datetime'],
        way_to_reserve: parseInt(record['way_to_reserve']),
        accept_date: record['accept_date'],
        status: parseInt(record['status']),
        achieve_flag: parseInt(record['achieve_flag']),
        amount: record['amount'],
        citizen_note: record['citizen_note'],
        facility_note: record['facility_note'],
        cancel_reason_category: parseInt(record['cancel_reason_category']),
        cancel_note: record['cancel_note'],
        use_reason_category: parseInt(record['use_reason_category']),
        create_user: record['create_user'],
        create_datetime: record['create_datetime'],
        update_user: record['update_user'],
        update_datetime: record['update_datetime']
    };
};
var UseReservationMaster = /** @class */ (function () {
    function UseReservationMaster() {
        this.usereservations = new Array();
    }
    UseReservationMaster.prototype.setup = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, filesIO_1.readCsv)(path, converter)];
                    case 1:
                        result = _b.sent();
                        (_a = this.usereservations).splice.apply(_a, __spreadArray([this.usereservations.length, 0], result, false));
                        return [2 /*return*/];
                }
            });
        });
    };
    UseReservationMaster.prototype.getUseReservations = function () {
        return this.usereservations;
    };
    return UseReservationMaster;
}());
exports.UseReservationMaster = UseReservationMaster;
