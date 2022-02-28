import exp from "constants";

enum ReserveType {
    FULL,
    AMPM,
    SP1,
    SP2
}

export const getStatusNumber = (enumStatus: ReserveStatus): number => {
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

}

export enum ReserveStatus {
    Request,
    Approved,
    Used
}

export interface ReserveTime {
    use_from_time: string; // 00:00:00
    use_to_time: string; // 00:00:00
}

export const ReservePettern = new Map<ReserveType, Array<ReserveTime>> ();
ReservePettern.set(ReserveType.FULL, [{use_from_time: '09:00:00', use_to_time: '18:00:00'}]);
ReservePettern.set(ReserveType.AMPM, 
    [{use_from_time: '09:00:00', use_to_time: '12:00:00'} ,
     {use_from_time: '13:00:00', use_to_time: '18:00:00'}]);
ReservePettern.set(ReserveType.SP1, 
    [{use_from_time: '10:00:00', use_to_time: '13:00:00'} ,
     {use_from_time: '14:00:00', use_to_time: '17:00:00'}]);
ReservePettern.set(ReserveType.SP2, 
    [{use_from_time: '11:00:00', use_to_time: '15:00:00'} ,
     {use_from_time: '16:00:00', use_to_time: '18:00:00'}]);
        
// 割合 FULL:AMPM:SP1:SP2 = 14:4:1:1
export const getRandumReservePettern = (): Array<ReserveTime>  => {
    let randum = Math.floor(Math.random() * (20 - 1));
    let result = randum < 14 ? ReservePettern.get(ReserveType.FULL) :
           randum < 18 ? ReservePettern.get(ReserveType.AMPM) :
           randum < 19 ? ReservePettern.get(ReserveType.SP1) :
           ReservePettern.get(ReserveType.SP2);
    if (!result) {
        throw Error('not found result. support out value: ' + result);
    }
    return result;
};

const TODAY = new Date('2022-03-02');
const FEWER_ZONES= new Date('2022-03-21');

export const get1DayCount = (date: string): number => {
    let random = Math.floor(Math.random() * (14-1));
    let baseDate = new Date(date);
    if (TODAY.getTime() > baseDate.getTime()) {
        // 過去分
        return random < 8 ? 10 : 
               random < 12 ? 9 :
               8;
    } else if (FEWER_ZONES.getTime() > baseDate.getTime()) {
        // 割と近い未来
        return random < 3  ? 9 : 
               random < 6  ? 8 :
               random < 9  ? 7 :
               random < 11 ? 6 :
               random < 13 ? 5 :
               4;
    } else {
        // ちょっと遠い未来
        return random < 3  ? 5 : 
               random < 6  ? 4 :
               random < 9  ? 3 :
               random < 11 ? 2 :
               random < 13 ? 1 :
               0;
    }
}

export const getReserveStatus = (date: string): ReserveStatus => {
    let baseDate = new Date(date);
    let random = Math.floor(Math.random() * (4));
    if (TODAY.getTime() > baseDate.getTime()) {
        // 過去分
        return ReserveStatus.Used;
    } else if (FEWER_ZONES.getTime() > baseDate.getTime()) {
        // 割と近い未来
        return random < 3 ? ReserveStatus.Approved : 
        ReserveStatus.Request;
    } else {
        // ちょっと遠い未来
        return random < 1 ? ReserveStatus.Approved : 
        ReserveStatus.Request;
    }
}

