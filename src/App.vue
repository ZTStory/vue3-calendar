<template>
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <Calendar v-model:selectedDate="selectedDate" :config="calendarConfig"></Calendar>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "@vue/runtime-core";
import Calendar from "./calendar/Calendar.vue";
import { ZTCalendarConfig, ZTCalendarDay } from "./calendar/calendar.config";
import DayjsUtils from "./calendar/dayjs.util";
import dayjs from "dayjs";
export default defineComponent({
    components: {
        Calendar,
    },
    setup() {
        let selectedDate = ref("");

        const config = new ZTCalendarConfig();
        // config.lunar = true;
        config.onlyHoliday = true;
        config.canUseDays = 300;

        config.settingDayCb = (day: ZTCalendarDay) => {
            const currentDay = dayjs(day.format);
            if (currentDay.isSame(dayjs(selectedDate.value), "day")) {
                day.selected = true;
            }
            if (DayjsUtils.isBetween(day.format, ["2021-09-19", "2021-09-21"], "day")) {
                day.isRest = true;
                day.bottomDesc = "可售";
            }
            if (DayjsUtils.isBetween(day.format, ["2021-10-01", "2021-10-07"], "day")) {
                day.isRest = true;
                day.bottomDesc = "￥100";
            }
            if (currentDay.isSame("2021-09-18", "day")) {
                day.isWork = true;
            }
            if (currentDay.format("MM-DD") === "05-23") {

                day.color = "yellow";
            }
            return day;
        };
        watch(selectedDate, (newVal) => {
            console.log(newVal);
        });
        return {
            selectedDate,
            calendarConfig: ref(config),
        };
    },
});
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 100%;
}
</style>
