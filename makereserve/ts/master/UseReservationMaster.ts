import { UseReservation } from "../entity/entites";
import { Converter, readCsv } from "../utils/filesIO";

const converter: Converter<UseReservation> = (record, index) => {
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

export class UseReservationMaster {
    usereservations: Array<UseReservation> = new Array<UseReservation>();
    constructor() {
    }
    async setup(path: string) {
        const result = await readCsv(path, converter);
        this.usereservations.splice(this.usereservations.length, 0, ...result);
    }
    getUseReservations(): Array<UseReservation> {
        return this.usereservations;
    }
}
