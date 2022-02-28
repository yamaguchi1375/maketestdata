import { CalendarMst } from "./dtos/dtos";
import { Children } from "./entity/entites";
import { ReserveDataMaker } from "./make/makeReserveData";
import { CalendarMaster, getAcceptDate } from "./master/CalendarMaster";
import { ChildrenMaster } from "./master/ChildrenMaster";
import { ReserveDataStore } from "./stores/reservestore";
import { get1DayCount, getRandumReservePettern, getReserveStatus, ReserveStatus } from "./types/reservetime";
import { exportCSV, exportSql } from "./utils/filesIO";
import { JsonPathToSource, JsonToBasicSouce } from "./utils/makesource";

const CALENDAR_PATH = `/Users/yamaguchitakeshi/slk/gitwork/maketestdata/master/calendarmst.csv`;
const CHILDREN_PATH = `/Users/yamaguchitakeshi/slk/gitwork/maketestdata/master/reserve/children.json`;

/* param area */
const FACILITY_ID = 'a10035';
const ACTIVITY_USER_ID = 'afb530ae-a1e7-477c-aab5-9a779603e2d6';
const START_RESERVE_NO = 6;
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

    // console.log(maker.getDataStore().getReserveData());
    // console.log(maker.getDataStore().getFixdata());
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

