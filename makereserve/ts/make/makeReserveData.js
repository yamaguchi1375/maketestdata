"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReserveDataMaker = void 0;
var entites_1 = require("../entity/entites");
var CalendarMaster_1 = require("../master/CalendarMaster");
var reservestore_1 = require("../stores/reservestore");
var reservetime_1 = require("../types/reservetime");
var ReserveDataMaker = /** @class */ (function () {
    function ReserveDataMaker(updateUserId, facilityId, childMaster, startResesrveNo) {
        this.updateUserId = updateUserId;
        this.facilityId = facilityId;
        this.childMaster = childMaster;
        this.store = new reservestore_1.ReserveDataStore();
        this.startReserveNo = startResesrveNo;
    }
    ReserveDataMaker.prototype.make = function (date, exists) {
        var _this = this;
        var pettern = (0, reservetime_1.getRandumReservePettern)();
        pettern.forEach(function (time) {
            var reserve = _this.makeReserveData(date, exists, time);
            _this.store.addReserveData(reserve);
            if (reserve.status == 2) {
                _this.store.addFixData(_this.makeFixData(reserve));
            }
        });
    };
    ReserveDataMaker.prototype.makeReserveData = function (date, exists, time) {
        var status = (0, reservetime_1.getReserveStatus)(date);
        var child = this.childMaster.getRandomChild(exists);
        var acceptDate = (0, CalendarMaster_1.getAcceptDate)(date).toISOString().split("T")[0];
        exists.push(child);
        var sdateTime = date + ' ' + time.use_from_time;
        var edateTime = date + ' ' + time.use_to_time;
        var record = status == reservetime_1.ReserveStatus.Request ? __assign({}, entites_1.basicRequestUseReservationEntity) :
            status == reservetime_1.ReserveStatus.Approved ? __assign({}, entites_1.basicReservedUseReservationEntity) : __assign({}, entites_1.basicUsedUseReservationEntity);
        record.reservation_no = this.startReserveNo;
        record.user_id = child.user_id;
        record.child_id = child.child_id;
        record.facility_id = this.facilityId;
        record.usage_date = date;
        record.use_from_datetime = sdateTime;
        record.use_to_datetime = edateTime;
        record.accept_date = acceptDate;
        record.create_user = this.updateUserId;
        record.update_user = this.updateUserId;
        this.startReserveNo += 1;
        return record;
    };
    ReserveDataMaker.prototype.makeFixData = function (reserve) {
        if (reserve.status != 2) {
            throw new Error('this data is not used data no: ' + reserve.reservation_no);
        }
        var record = __assign({}, entites_1.basicUsageRecordEntity);
        record.reservation_no = reserve.reservation_no;
        record.facility_id = reserve.facility_id;
        record.user_id = reserve.user_id;
        record.child_id = reserve.child_id;
        record.usage_date = reserve.usage_date;
        record.use_from_datetime = reserve.use_from_datetime;
        record.use_to_datetime = reserve.use_to_datetime;
        record.accept_date = reserve.accept_date;
        record.create_user = reserve.create_user;
        record.update_user = reserve.update_user;
        return record;
    };
    ReserveDataMaker.prototype.getDataStore = function () {
        return this.store;
    };
    return ReserveDataMaker;
}());
exports.ReserveDataMaker = ReserveDataMaker;
