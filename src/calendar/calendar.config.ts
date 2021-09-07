import dayjs from "dayjs";

function _formatNumber(num: number): string {
    if (num > 0 && num < 10) {
        return `0${num}`;
    }
    return `${num}`;
}

export class ZTCalendarConfig {
    weeks: Array<string>;
    lunar: boolean;
    onlyHoliday: boolean;
    /**
     * 日期可用天数
     */
    canUseDays: number;
    /**
     * 日期可用起始日期：YYYY-MM-DD
     */
    startDay: string;

    range: boolean;

    settingDayCb: (day: ZTCalendarDay) => ZTCalendarDay;

    constructor() {
        this.weeks = ["日", "一", "二", "三", "四", "五", "六"];
        this.canUseDays = -1;
        this.startDay = dayjs(new Date()).format("YYYY-MM-DD");
        this.lunar = false;
        this.onlyHoliday = false;
        this.range = false;
        this.settingDayCb = (day) => day;
    }
    /**
     * 获取月份长度
     * @returns number 生成的最大月数
     */
    getMonthLength() {
        if (this.canUseDays > 0) {
            return this.canUseDays / 30 + 1;
        }
        return 1;
    }
}

export class ZTCalendarDay {
    readonly day: number;
    readonly month: number;
    readonly year: number;
    readonly format: string;

    selected: boolean;
    selectable: boolean;

    color?: string;
    alias?: string;
    bottomDesc?: string;

    lunar?: string;
    holiday?: string;
    isWork?: boolean; // 班
    isRest?: boolean; // 休

    constructor(options: { day: number; month: number; year: number; selected: boolean; selectable: boolean }) {
        this.day = options.day;
        this.month = options.month;
        this.year = options.year;
        this.format = `${this.year}-${_formatNumber(this.month)}-${_formatNumber(this.day)}`;
        this.selected = options.selected;
        this.selectable = options.selectable;
        this.color = "#333";
        this.bottomDesc = "";
        this.lunar = "";
        this.holiday = "";
        this.isWork = false;
        this.isRest = false;
    }
}
