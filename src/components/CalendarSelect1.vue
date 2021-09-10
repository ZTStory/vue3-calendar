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
import NavBar from "./NavBar.vue";
import { ZTCalendarConfig } from "../calendar/calendar.config";

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
            if (newVal.length) localStorage.setItem("CalendarSelect1", newVal[0]);
            else localStorage.setItem("CalendarSelect1", "");
            backAction();
        });
        const config = new ZTCalendarConfig();

        return {
            backAction,
            calendarConfig: ref(config),
            selectedDates,
        };
    },
});
</script>

<style scoped></style>
