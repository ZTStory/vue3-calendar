<template>
    <div class="calendar flex_column">
        <div class="week_head flex_row flex_around flex_none">
            <span class="week_head_text flex_1" v-for="(week, i) in weeks" :key="i">{{ week }}</span>
        </div>
        <div class="calendar_wrap flex_1">
            <div v-for="(month, i) in refCalendarList" :key="i">
                <div class="calendar_month_title">{{ month.year }}年{{ month.month }}月</div>
                <div class="flex_row flex_wrap">
                    <div class="calendar_month_day flex_none" v-for="(emptyGrid, index) in month.emptyGrids" :key="index"></div>
                    <div
                        class="calendar_month_day flex_none flex_column flex_center"
                        :class="{ selected: day.selected, disable: !day.selectable }"
                        v-for="(day, index) in month.days"
                        :key="index"
                        @click="chooseDayForMode(day)"
                    >
                        <div class="calendar_month_day_index" :style="{ color: getDayColor(day) }">
                            {{ day.alias || day.day }}
                        </div>
                        <div class="calendar_month_day_desc">{{ day.bottomDesc || day.holiday || day.lunar }}&#8203;</div>
                        <div
                            :class="{
                                calendar_month_day_rest: day.isRest,
                                calendar_month_day_work: day.isWork,
                            }"
                        >
                            {{ day.isRest ? "休" : day.isWork ? "班" : "" }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, toRef, watch } from "vue";
import { defineComponent } from "@vue/runtime-core";
import { ZTCalendarConfig, ZTCalendarDay, ZTCalendarMode } from "./calendar.config";
import { ZTCalendarCore } from "./calendar.core";
import useCalendarMutipleMode from "./calendar.mutiple";
import useCalendarSingleMode from "./calendar.single";
export default defineComponent({
    name: "Calendar",
    props: {
        config: {
            type: ZTCalendarConfig,
            default: () => new ZTCalendarConfig(),
        },
        selectedDates: Array,
    },
    setup(props, { emit }) {
        console.log(props.config);

        const calendar = new ZTCalendarCore(props.config);
        const selectedDates = toRef(props, "selectedDates");

        let refCalendarList = ref();
        let chooseDayForMode = (day: ZTCalendarDay) => {
            return;
        };
        if (props.config.mode === ZTCalendarMode.Single) {
            const { calendarList, chooseDay } = useCalendarSingleMode(calendar, selectedDates, emit);
            refCalendarList = calendarList;
            chooseDayForMode = chooseDay;
        } else if (props.config.mode === ZTCalendarMode.Multiple) {
            const { calendarList, lastSelectedDays, chooseDay } = useCalendarMutipleMode(calendar, selectedDates, emit);
            refCalendarList = calendarList;
            chooseDayForMode = chooseDay;

            watch(selectedDates, () => {
                lastSelectedDays.value = [];
                refCalendarList.value = calendar.updateCalendar();
            });
        }

        return {
            refCalendarList,
            chooseDayForMode,
            weeks: ref(["日", "一", "二", "三", "四", "五", "六"]),
            getDayColor: (day: ZTCalendarDay) => {
                return !day.selectable
                    ? "#999"
                    : day.selected
                    ? "#fff"
                    : day.isRest
                    ? "#ff5555"
                    : day.isWork
                    ? "#333"
                    : day.alias
                    ? "#ff8400"
                    : day.color;
            },
        };
    },
});
</script>

<style scoped>
@import "./flex.css";

.calendar {
    width: 100%;
    height: 100%;
    background-color: #fff;
    color: #333;
}
.week_head {
    width: 100%;
    background: #fff;
    box-shadow: 0px 0px 6px 0px rgba(227, 227, 227, 1);
    z-index: 10;
}

.week_head_text {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    text-align: center;
}

.calendar_wrap {
    width: 100%;
    height: 100%;
    overflow: auto;
}

.calendar_month_title {
    background: #fff;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-weight: 600;
    font-size: 18px;
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    z-index: 10;
}

.calendar_month_day {
    text-align: center;
    min-height: 60px;
    width: calc(100% / 7);
    position: relative;
}

.calendar_month_day.selected {
    background-color: #00a4ff;
    color: #fff;
    border-radius: 4px;
}
.calendar_month_day.disable {
    color: #999;
}

.calendar_month_day_index {
    font-size: 17px;
    font-weight: 600;
}

.calendar_month_day_desc {
    font-size: 12px;
}

.calendar_month_day_rest {
    position: absolute;
    left: 3px;
    top: 3px;
    font-size: 12px;
    color: #ff5555;
}

.calendar_month_day_work {
    position: absolute;
    left: 3px;
    top: 3px;
    font-size: 12px;
    color: #333;
}
</style>
