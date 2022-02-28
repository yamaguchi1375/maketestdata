"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReserveDataStore = void 0;
var ReserveDataStore = /** @class */ (function () {
    function ReserveDataStore() {
        this.reservedata = [];
        this.fixdata = [];
    }
    ReserveDataStore.prototype.getReserveData = function () {
        return this.reservedata;
    };
    ;
    ReserveDataStore.prototype.getFixdata = function () {
        return this.fixdata;
    };
    ;
    ReserveDataStore.prototype.addReserveData = function (record) {
        this.reservedata.push(record);
    };
    ReserveDataStore.prototype.addFixData = function (record) {
        this.fixdata.push(record);
    };
    return ReserveDataStore;
}());
exports.ReserveDataStore = ReserveDataStore;
;
