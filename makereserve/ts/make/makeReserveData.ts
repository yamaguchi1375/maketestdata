import { basicRequestUseReservationEntity, basicReservedUseReservationEntity, basicUsageRecordEntity, basicUsedUseReservationEntity, Children, UsageRecord, UseReservation } from "../entity/entites";
import { getAcceptDate } from "../master/CalendarMaster";
import { ChildrenMaster } from "../master/ChildrenMaster";
import { ReserveDataStore } from "../stores/reservestore";
import { getRandumReservePettern, getReserveStatus, ReserveStatus, ReserveTime } from "../types/reservetime";

export class ReserveDataMaker {
    updateUserId: string;
    facilityId: string;
    childMaster: ChildrenMaster;
    store: ReserveDataStore;
    startReserveNo: number;
    constructor(updateUserId: string, facilityId: string, childMaster: ChildrenMaster, startResesrveNo: number) {
        this.updateUserId = updateUserId;
        this.facilityId = facilityId;
        this.childMaster = childMaster;
        this.store = new ReserveDataStore();
        this.startReserveNo = startResesrveNo;
    }
 
    make(date: string, exists: Array<Children>) {
        let pettern = getRandumReservePettern();
        pettern.forEach(time => {
            let reserve = this.makeReserveData(date, exists, time);
            this.store.addReserveData(reserve);
            if (reserve.status == 2) {
                this.store.addFixData(this.makeFixData(reserve));
            }
        })
    }

    private makeReserveData(date: string, exists: Array<Children>, time: ReserveTime): UseReservation {
        let status = getReserveStatus(date);
        let child = this.childMaster.getRandomChild(exists);
        let acceptDate = getAcceptDate(date).toISOString().split("T")[0];
        exists.push(child);
        let sdateTime = date + ' ' + time.use_from_time;
        let edateTime = date + ' ' + time.use_to_time;
        let record = status == ReserveStatus.Request ? { ...basicRequestUseReservationEntity } :
        status == ReserveStatus.Approved ? { ...basicReservedUseReservationEntity }
        : { ...basicUsedUseReservationEntity };
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
    }

    private makeFixData(reserve: UseReservation): UsageRecord {
        if (reserve.status != 2) {
            throw new Error('this data is not used data no: ' + reserve.reservation_no);
        }
        let record = { ...basicUsageRecordEntity };
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
    }

    getDataStore(): ReserveDataStore {
        return this.store;
    }

}