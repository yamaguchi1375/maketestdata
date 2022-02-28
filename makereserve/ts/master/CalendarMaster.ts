import { domainToASCII } from "url";
import { CalendarMst } from "../dtos/dtos";
import { Converter, readCsv } from "../utils/filesIO";


const converter: Converter<CalendarMst> = (record, index) => {
    return {
        month: parseInt(record['month']),
        date: record['date'],
        day_of_week: record['day_of_week'],
        holiday: parseInt(record['holiday'])
    };
};

export class CalendarMaster {
    calendar: Array<CalendarMst> = new Array<CalendarMst>();
    constructor() {
    }
    async setup(path: string) {
        const result = await readCsv(path, converter);
        this.calendar.splice(this.calendar.length, 0, ...result);
    }
    getCalendar(): Array<CalendarMst> {
        return this.calendar;
    }
}

export const getAcceptDate = (date: string): Date => {
    let result = new Date(date);
    let diff = Math.floor(Math.random() * (10 - 1));
    result.setDate(result.getDate() - diff - 4);
    return result;
};
