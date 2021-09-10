<template>
    <div>
        <NavBar navTitle="日历操作示例" :canBack="false"></NavBar>
        <ol>
            <li @click="toCalendar1">单日期选择（默认）:{{ selectedDates.selectedDate1 }}</li>
            <li @click="toCalendar2">单日期选择（指定选择范围）:{{ selectedDates.selectedDate2 }}</li>
            <li @click="toCalendar3">单日期选择（支持农历，节日（自定义休班展示））:{{ selectedDates.selectedDate3 }}</li>
            <li @click="toCalendar4">单日期选择（支持自定义日期底部内容）:{{ selectedDates.selectedDate4 }}</li>
            <li @click="toCalendar5">多日期选择:{{ selectedDates.selectedDate5 }}</li>
        </ol>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import NavBar from "./NavBar.vue";
export default defineComponent({
    components: {
        NavBar,
    },
    setup() {
        let router = useRouter();
        let selectedDates = reactive({
            selectedDate1: "",
            selectedDate2: "",
            selectedDate3: "",
            selectedDate4: "",
            selectedDate5: "",
        });
        for (let index = 1; index <= 5; index++) {
            let selectedDate = localStorage.getItem(`CalendarSelect${index}`);
            if (selectedDate && selectedDate.length) {
                if (index === 1) selectedDates.selectedDate1 = selectedDate;
                if (index === 2) selectedDates.selectedDate2 = selectedDate;
                if (index === 3) selectedDates.selectedDate3 = selectedDate;
                if (index === 4) selectedDates.selectedDate4 = selectedDate;
                if (index === 5) selectedDates.selectedDate5 = selectedDate;
            }
        }

        return {
            selectedDates,
            toCalendar1: () => {
                router.push({
                    name: "CalendarSelect1",
                    query: { selectedDate: selectedDates.selectedDate1 },
                    params: {
                        mode: "push",
                    },
                });
            },
            toCalendar2: () => {
                router.push({
                    name: "CalendarSelect2",
                    query: { selectedDate: selectedDates.selectedDate2 },
                    params: {
                        mode: "push",
                    },
                });
            },
            toCalendar3: () => {
                router.push({
                    name: "CalendarSelect3",
                    query: { selectedDate: selectedDates.selectedDate3 },
                    params: {
                        mode: "push",
                    },
                });
            },
            toCalendar4: () => {
                router.push({
                    name: "CalendarSelect4",
                    query: { selectedDate: selectedDates.selectedDate4 },
                    params: {
                        mode: "push",
                    },
                });
            },
            toCalendar5: () => {
                router.push({
                    name: "CalendarSelect5",
                    query: { selectedDates: selectedDates.selectedDate5 },
                    params: {
                        mode: "push",
                    },
                });
            },
        };
    },
});
</script>

<style scoped>
li {
    text-align: left;
    margin-bottom: 20px;
}
ol {
    padding-top: 20px;
    margin: 0;
}
</style>
