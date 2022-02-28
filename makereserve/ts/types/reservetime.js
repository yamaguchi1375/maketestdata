"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReserveStatus = exports.get1DayCount = exports.getRandumReservePettern = exports.ReservePettern = exports.ReserveStatus = exports.getStatusNumber = void 0;
var ReserveType;
(function (ReserveType) {
    ReserveType[ReserveType["FULL"] = 0] = "FULL";
    ReserveType[ReserveType["AMPM"] = 1] = "AMPM";
    ReserveType[ReserveType["SP1"] = 2] = "SP1";
    ReserveType[ReserveType["SP2"] = 3] = "SP2";
})(ReserveType || (ReserveType = {}));
var getStatusNumber = function (enumStatus) {
    switch (enumStatus) {
        case ReserveStatus.Request:
            return 0;
        case ReserveStatus.Approved:
            return 1;
        case ReserveStatus.Used:
            return 2;
        default:
            throw new Error('not support enum value: ' + enumStatus);
    }
};
exports.getStatusNumber = getStatusNumber;
var ReserveStatus;
(function (ReserveStatus) {
    ReserveStatus[ReserveStatus["Request"] = 0] = "Request";
    ReserveStatus[ReserveStatus["Approved"] = 1] = "Approved";
    ReserveStatus[ReserveStatus["Used"] = 2] = "Used";
})(ReserveStatus = exports.ReserveStatus || (exports.ReserveStatus = {}));
exports.ReservePettern = new Map();
exports.ReservePettern.set(ReserveType.FULL, [{ use_from_time: '09:00:00', use_to_time: '18:00:00' }]);
exports.ReservePettern.set(ReserveType.AMPM, [{ use_from_time: '09:00:00', use_to_time: '12:00:00' },
    { use_from_time: '13:00:00', use_to_time: '18:00:00' }]);
exports.ReservePettern.set(ReserveType.SP1, [{ use_from_time: '10:00:00', use_to_time: '13:00:00' },
    { use_from_time: '14:00:00', use_to_time: '17:00:00' }]);
exports.ReservePettern.set(ReserveType.SP2, [{ use_from_time: '11:00:00', use_to_time: '15:00:00' },
    { use_from_time: '16:00:00', use_to_time: '18:00:00' }]);
// 割合 FULL:AMPM:SP1:SP2 = 14:4:1:1
var getRandumReservePettern = function () {
    var randum = Math.floor(Math.random() * (20 - 1));
    var result = randum < 14 ? exports.ReservePettern.get(ReserveType.FULL) :
        randum < 18 ? exports.ReservePettern.get(ReserveType.AMPM) :
            randum < 19 ? exports.ReservePettern.get(ReserveType.SP1) :
                exports.ReservePettern.get(ReserveType.SP2);
    if (!result) {
        throw Error('not found result. support out value: ' + result);
    }
    return result;
};
exports.getRandumReservePettern = getRandumReservePettern;
var TODAY = new Date('2022-03-02');
var FEWER_ZONES = new Date('2022-03-21');
var get1DayCount = function (date) {
    var random = Math.floor(Math.random() * (14 - 1));
    var baseDate = new Date(date);
    if (TODAY.getTime() > baseDate.getTime()) {
        // 過去分
        return random < 8 ? 10 :
            random < 12 ? 9 :
                8;
    }
    else if (FEWER_ZONES.getTime() > baseDate.getTime()) {
        // 割と近い未来
        return random < 3 ? 9 :
            random < 6 ? 8 :
                random < 9 ? 7 :
                    random < 11 ? 6 :
                        random < 13 ? 5 :
                            4;
    }
    else {
        // ちょっと遠い未来
        return random < 3 ? 5 :
            random < 6 ? 4 :
                random < 9 ? 3 :
                    random < 11 ? 2 :
                        random < 13 ? 1 :
                            0;
    }
};
exports.get1DayCount = get1DayCount;
var getReserveStatus = function (date) {
    var baseDate = new Date(date);
    var random = Math.floor(Math.random() * (4));
    if (TODAY.getTime() > baseDate.getTime()) {
        // 過去分
        return ReserveStatus.Used;
    }
    else if (FEWER_ZONES.getTime() > baseDate.getTime()) {
        // 割と近い未来
        return random < 3 ? ReserveStatus.Approved :
            ReserveStatus.Request;
    }
    else {
        // ちょっと遠い未来
        return random < 1 ? ReserveStatus.Approved :
            ReserveStatus.Request;
    }
};
exports.getReserveStatus = getReserveStatus;
