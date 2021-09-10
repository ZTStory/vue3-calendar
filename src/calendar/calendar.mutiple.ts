import { Ref, ref } from "vue";
import { ZTCalendarDay } from "./calendar.config";
import { ZTCalendarCore } from "./calendar.core";

export default function useCalendarMutipleMode(
    calendar: ZTCalendarCore,
    selectedDates: Ref<unknown[] | undefined>,
    emit: (event: string, ...args: any[]) => void
) {
    const lastSelectedDays = ref<Array<ZTCalendarDay>>([]);
    calendar.settingDayCb = (day) => {
        // Mutiple
        let selectedDate = selectedDates.value?.find((item) => item === day.format);
        if (selectedDate) {
            day.selected = true;
            lastSelectedDays.value.push(day);
        }
        return day;
    };
    let calendarList = ref(calendar.initCalendar());

    const chooseDay = (day: ZTCalendarDay) => {
        if (!day.selectable) {
            return;
        }
        day.selected = !day.selected;
        if (day.selected) {
            lastSelectedDays.value.push(day);
        } else {
            const index = lastSelectedDays.value.findIndex((item) => item == day);
            if (index >= 0) lastSelectedDays.value.splice(index, 1);
        }

        emit(
            "update:selectedDates",
            lastSelectedDays.value.map((item) => item.format)
        );
    };

    return {
        calendarList,
        lastSelectedDays,
        chooseDay,
    };
}
