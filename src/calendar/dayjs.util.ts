import dayjs, { OpUnitType } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
dayjs.extend(isToday);

export default {
    isBetween(date: string, range: Array<string>, type: OpUnitType) {
        return dayjs(date).isBetween(range[0], range[1], type, "[]");
    },
};
