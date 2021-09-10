import { ZTCalendarConfig, ZTCalendarDay } from "./calendar.config";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import Lunar from "./lunar/lunar.js";
dayjs.extend(isBetween);

function _formatNumber(num: number): string {
    if (num > 0 && num < 10) {
        return `0${num}`;
    }
    return `${num}`;
}

export class ZTCalendarCore {
    config: ZTCalendarConfig;
    settingDayCb: (day: ZTCalendarDay) => ZTCalendarDay;

    constructor(config: ZTCalendarConfig) {
        this.config = config;
        this.settingDayCb = (day: ZTCalendarDay) => day;
    }

    initCalendar() {
        const calendarList = [] as Array<ZTCalendarMonth>;
        for (let index = 0; index < this.config.getMonthLength(); index++) {
            if (index === 0) {
                calendarList.push(this.settingCalendarMonth());
            } else {
                calendarList.push(this.settingCalendarMonth(calendarList[calendarList.length - 1]));
            }
        }
        return calendarList;
    }

    updateCalendar(config?: ZTCalendarConfig) {
        if (!config) {
            return this.initCalendar();
        }
        this.config = config;
        return this.initCalendar();
    }

    private settingCalendarMonth(lastMonth?: ZTCalendarMonth) {
        let newMonth = new ZTCalendarMonth();
        if (lastMonth) {
            newMonth = lastMonth.toNext();
        }
        newMonth.days = this.calculateDays(newMonth);
        return newMonth;
    }

    private calculateDays(month: ZTCalendarMonth) {
        let days = [];
        let startDay = dayjs(this.config.startDay);
        let endDay;
        if (this.config.canUseDays > 0) {
            endDay = startDay.add(this.config.canUseDays, "day");
        } else {
            endDay = startDay.add(365, "day");
        }

        for (let index = 1; index <= month.getMonthDays(); index++) {
            let day = new ZTCalendarDay({
                day: index,
                year: month.year,
                month: month.month,
                selected: false,
                selectable: true,
            });
            let currentDay = dayjs(`${day.year}-${_formatNumber(day.month)}-${_formatNumber(day.day)}`);
            if (!currentDay.isBetween(startDay, endDay, "date", "[]")) {
                day.selectable = false;
            }
            if (this.config.lunar || this.config.onlyHoliday) {
                let lunar = Lunar.solar2lunar(day.year, day.month, index);
                if (this.config.lunar) day.lunar = lunar.IDayCn;
                if (this.config.lunar || this.config.onlyHoliday) day.holiday = lunar.festival || lunar.lunarFestival;
            }
            day.color = this.settingDayColor(currentDay);

            day = this.settingDayCb(day);
            day = this.config.settingDayCb(day);

            days.push(day);
        }
        return days;
    }

    settingDayColor(currentDay: Dayjs) {
        if (currentDay.day() === 0 || currentDay.day() === 6) {
            return "#ff5555";
        }
        return "#333";
    }
}

class ZTCalendarMonth {
    year: number;
    month: number;
    emptyGrids: Array<number>;
    days: Array<ZTCalendarDay>;

    constructor(year?: number, month?: number) {
        this.year = year ?? dayjs().year();
        this.month = month ?? dayjs().month() + 1;
        this.emptyGrids = this.calculateEmptyGrids();
        this.days = [];
    }

    toNext() {
        let nextMonth = dayjs(`${this.year}-${this.month}-01`).add(1, "month");
        return new ZTCalendarMonth(nextMonth.year(), nextMonth.month() + 1);
    }

    getMonthDays() {
        return dayjs(`${this.year}-${this.month}-01`).daysInMonth();
    }

    private calculateEmptyGrids() {
        let firstDayOfWeek = this.getFirstDayOfWeek();
        let emptyGrids = [];
        for (let index = 0; index < firstDayOfWeek; index++) {
            emptyGrids.push(index);
        }
        return emptyGrids;
    }

    private getFirstDayOfWeek() {
        return dayjs(`${this.year}-${this.month}-01`).day();
    }
}
