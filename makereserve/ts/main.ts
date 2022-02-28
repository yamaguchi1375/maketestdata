import { CalendarMst } from "./dtos/dtos";
import { Children, MendanTarget, UseReservation } from "./entity/entites";
import { ReserveDataMaker } from "./make/makeReserveData";
import { CalendarMaster, getAcceptDate } from "./master/CalendarMaster";
import { ChildrenMaster } from "./master/ChildrenMaster";
import { UseReservationMaster } from "./master/UseReservationMaster";
import { ReserveDataStore } from "./stores/reservestore";
import { get1DayCount, getRandumReservePettern, getReserveStatus, ReserveStatus } from "./types/reservetime";
import { Converter, exportCSV, exportSql, readCsv } from "./utils/filesIO";
import { JsonPathToSource, JsonToBasicSouce } from "./utils/makesource";

const CALENDAR_PATH = `/Users/yamaguchitakeshi/slk/gitwork/maketestdata/master/calendarmst.csv`;
const CALENDAR_MENDAN_PATH = `/Users/yamaguchitakeshi/slk/gitwork/maketestdata/master/calendarmendanmst.csv`;

/* ------------ param area ------------- */
const FACILITY_ID = 'a10041';
const ACTIVITY_USER_ID = '4dc2298b-7b37-442b-a818-b935ca1c0077';
const CHILDREN_PATH = `/Users/yamaguchitakeshi/slk/gitwork/maketestdata/master/reserve/children_a10041.json`;
const START_RESERVE_NO = 2299;
/* ------------ param area ------------- */


const SQL_EXPORT_PATH = "/Users/yamaguchitakeshi/slk/gitwork/maketestdata/master/reserve/exportsql/";
const CSV_EXPORT_PATH = "/Users/yamaguchitakeshi/slk/gitwork/maketestdata/master/reserve/exportcsv/";

async function makeEntitySource() {
    let jsonsource = new JsonPathToSource();
    jsonsource.makeInterfaceSource('use_reservation', "/Users/yamaguchitakeshi/slk/gitwork/maketestdata/master/reserve/basic/use_reservation.json");
}

async function makeBasicData() {
    await JsonToBasicSouce.makeJsonToBasicSource('use_reservation', "/Users/yamaguchitakeshi/slk/gitwork/maketestdata/master/reserve/basic/use_reservation.json");
}

main();

async function main() {
    // makeEntitySource();
    // makeBasicData();
    makeReserveDatas();
    // makeMendanData();
}

async function makeReserveDatas() {
    console.log('start make reserve datas');
    let childrenMaster = new ChildrenMaster();
    await childrenMaster.setup(CHILDREN_PATH);
    let maker: ReserveDataMaker = new ReserveDataMaker(ACTIVITY_USER_ID, FACILITY_ID, childrenMaster, START_RESERVE_NO);
    let targetDays: Array<CalendarMst> = await loadTargetDays();
    targetDays.filter(day => day.holiday == 0)
    .filter(day => day.day_of_week != '土')
    .filter(day => day.day_of_week != '日')
    .forEach(day => makeReserveData(maker, day.date));
    exportSql(SQL_EXPORT_PATH, 'use_reservation', maker.getDataStore().getReserveData());   
    exportSql(SQL_EXPORT_PATH, 'usage_record', maker.getDataStore().getFixdata());   
    
    exportCSV(CSV_EXPORT_PATH, 'use_reservation', maker.getDataStore().getReserveData());   
    exportCSV(CSV_EXPORT_PATH, 'usage_record', maker.getDataStore().getFixdata());   

    console.log('end make reserve datas');
}

async function loadTargetDays(): Promise<Array<CalendarMst>> {
    let calendarmst = new CalendarMaster();
    await calendarmst.setup(CALENDAR_PATH);
    return new Promise((resolve, reject) => {
        resolve(calendarmst.getCalendar());
    });
};

function makeReserveData(maker: ReserveDataMaker, date: string) {
    let childrenOneDay = new Array<Children>();
    let makeCount = get1DayCount(date);
    for (let i=0; i<makeCount; i++) {
        maker.make(date, childrenOneDay);
    }
}

async function makeMendanData() {
    let filePath = CSV_EXPORT_PATH + 'use_reservation.csv';
    let reservationmst = new UseReservationMaster();
    await reservationmst.setup(filePath);
    let useReservations = reservationmst.getUseReservations();
    let targetDays = await loadMendanTargetDays();
    let createDate = new Array<MendanTarget>();
    targetDays.forEach(cal => {
        let count = useReservations.filter(record => record.usage_date == cal.date).length;
        if (count < 10) {
            createDate.push({target_date: cal.date});
        }
    });
    exportCSV(CSV_EXPORT_PATH, 'mendan_target', createDate);
}

async function loadMendanTargetDays(): Promise<Array<CalendarMst>> {
    let calendarmst = new CalendarMaster();
    await calendarmst.setup(CALENDAR_MENDAN_PATH);
    return new Promise((resolve, reject) => {
        resolve(calendarmst.getCalendar());
    });
};

