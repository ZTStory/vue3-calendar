<template>
    <div class="page_container">
        <NavBar navTitle="日历选择" @back="backAction">
            <span class="bar_right" @click="selectedDates = []">清空</span>
        </NavBar>
        <div class="flex_1" style="overflow: auto">
            <Calendar class="flex_1" v-model:selectedDates="selectedDates" :config="calendarConfig"></Calendar>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRouter } from "vue-router";
import Calendar from "../calendar/Calendar.vue";
import NavBar from "./NavBar.vue";
import { ZTCalendarConfig, ZTCalendarDay, ZTCalendarMode } from "../calendar/calendar.config";

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
        if (router.currentRoute.value.query.selectedDates) {
            let str = router.currentRoute.value.query.selectedDates as string;
            selectedDates.value = str.split("，");
        }
        watch(selectedDates, (newVal) => {
            localStorage.setItem("CalendarSelect5", newVal.join("，"));
        });

        const config = new ZTCalendarConfig();
        config.mode = ZTCalendarMode.Multiple;
        config.onlyHoliday = true;
        config.settingDayCb = (day: ZTCalendarDay) => {
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
