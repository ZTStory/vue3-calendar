<template>
    <div class="page_container">
        <NavBar navTitle="日历选择" @back="backAction"></NavBar>
        <div class="flex_1" style="overflow: auto">
            <Calendar class="flex_1" v-model:selectedDates="selectedDates" :config="calendarConfig"></Calendar>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";
import Calendar from "../calendar/Calendar.vue";
import { ZTCalendarConfig, ZTCalendarDay } from "../calendar/calendar.config";
import NavBar from "./NavBar.vue";
import DayjsUtils from "../calendar/dayjs.util";
import dayjs from "dayjs";

export default defineComponent({
    components: {
        Calendar,
        NavBar,
    },
    setup() {
        const router = useRouter();
        const backAction = () => {
            router.replace({
                name: "Index",
                params: {
                    mode: "pop",
                },
            });
        };

        let selectedDates = ref<Array<string>>([]);
        if (router.currentRoute.value.query.selectedDate) {
            selectedDates.value = [router.currentRoute.value.query.selectedDate as string];
        }
        watch(selectedDates, (newVal) => {
            if (newVal.length) localStorage.setItem("CalendarSelect4", newVal[0]);
            else localStorage.setItem("CalendarSelect4", "");
            backAction();
        });

        const config = new ZTCalendarConfig();
        config.onlyHoliday = true;
        config.settingDayCb = (day: ZTCalendarDay) => {
            if (dayjs().format("YYYY-MM-DD") === day.format) {
                day.alias = "今天";
            }
            if (DayjsUtils.add(1) === day.format) {
                day.alias = "明天";
            }
            if (DayjsUtils.isBetween(day.format, [DayjsUtils.add(5), DayjsUtils.add(10)], "day")) {
                day.bottomDesc = "可售";
            }
            if (DayjsUtils.isBetween(day.format, [DayjsUtils.add(20), DayjsUtils.add(30)], "day")) {
                day.bottomDesc = "￥100";
            }
            return day;
        };

        return {
            backAction,
            calendarConfig: ref(config),
            selectedDates,
        };
    },
});
</script>

<style scoped></style>
