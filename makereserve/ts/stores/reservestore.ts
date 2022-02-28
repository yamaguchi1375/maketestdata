import { UsageRecord, UseReservation } from "../entity/entites";

export class ReserveDataStore {
    reservedata: Array<UseReservation>;
    fixdata: Array<UsageRecord>;
    constructor() {
        this.reservedata = [];
        this.fixdata = [];
    }
    getReserveData(): Array<UseReservation> {
        return this.reservedata;
    };
    getFixdata(): Array<UsageRecord> {
        return this.fixdata;
    };
    addReserveData(record: UseReservation) {
        this.reservedata.push(record);
    }
    addFixData(record: UsageRecord) {
        this.fixdata.push(record);
    }
};
