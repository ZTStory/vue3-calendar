import dayjs from "dayjs";

function _formatNumber(num: number): string {
    if (num > 0 && num < 10) {
        return `0${num}`;
    }
    return `${num}`;
}

export enum ZTCalendarMode {
    /** 单选 */
    Single = 0,
    /** 多选 */
    Multiple = 1,
    /** 范围选择，暂未实现 */
    Range = 2,
}

export class ZTCalendarConfig {
    /**
     * 日期选择模式
     * @enum {ZTCalendarMode}
     * @default Single
     */
    mode: ZTCalendarMode;
    /**
     * 是否支持农历（包含公农历节假日展示）
     */
    lunar: boolean;
    /**
     * 仅展示节假日相关
     */
    onlyHoliday: boolean;
    /**
     * 日期可用天数
     */
    canUseDays: number;
    /**
     * 日期可用起始日期：YYYY-MM-DD
     */
    startDay: string;
    /**
     * 日历day对象hooks，可在此处自定义day展示
     * @param {ZTCalendarDay} day 日历中的每一个day对象
     * @returns {ZTCalendarDay} 返回自定义对象，默认直接返回day
     */
    settingDayCb: (day: ZTCalendarDay) => ZTCalendarDay;

    constructor() {
        this.mode = ZTCalendarMode.Single;
        this.canUseDays = -1;
        this.startDay = dayjs(new Date()).format("YYYY-MM-DD");
        this.lunar = false;
        this.onlyHoliday = false;
        this.settingDayCb = (day) => day;
    }
    /**
     * 获取月份长度
     * @returns number 生成的最小月数
     */
    getMonthLength() {
        if (this.canUseDays > 0) {
            let startDay = dayjs(this.startDay);
            let startMonthDiff = startDay.daysInMonth() - startDay.date();
            const needMinMonth = Math.ceil((this.canUseDays - startMonthDiff) / 30) + 1;
            return needMinMonth;
        }
        return 3;
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
