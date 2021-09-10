import { Ref, ref } from "vue";
import { ZTCalendarDay } from "./calendar.config";
import { ZTCalendarCore } from "./calendar.core";

export default function useCalendarSingleMode(
    calendar: ZTCalendarCore,
    selectedDates: Ref<unknown[] | undefined>,
    emit: (event: string, ...args: any[]) => void
) {
    const lastSelectedDays = ref<Array<ZTCalendarDay>>([]);
    calendar.settingDayCb = (day) => {
        // Single
        if (selectedDates.value?.length && day.format === selectedDates.value[0]) {
            day.selected = true;
            lastSelectedDays.value.push(day);
        }
        return day;
    };
    const calendarList = ref(calendar.initCalendar());

    const chooseDay = (day: ZTCalendarDay) => {
        if (!day.selectable) {
            return;
        }
        if (lastSelectedDays.value.length) {
            lastSelectedDays.value[0].selected = false;
        }
        day.selected = true;
        lastSelectedDays.value = [];
        lastSelectedDays.value.push(day);

        emit(
            "update:selectedDates",
            lastSelectedDays.value.map((item) => item.format)
        );
    };

    return {
        calendarList,
        chooseDay,
    };
}
