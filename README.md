# vue3-calendar

📅 一款`vue3`与`TypeScript`编写的`移动端`灵活配置日历

根据业务需求可以灵活配置每一天的展示信息

日历怎么改，全靠 config+day

## 在线演示

暂时只支持移动端，所以记得调整屏幕尺寸哦
[ztstory.github.io/vue3-calendar/](https://ztstory.github.io/vue3-calendar/)

## Usage

该项目依赖`dayjs`

提供一个最简单的使用方法，默认是单选哦~

```
<Calendar v-model:selectedDates="selectedDates" :config="config"></Calendar>

import Calendar from "../calendar/Calendar.vue";
import { ZTCalendarConfig } from "../calendar/calendar.config";

setup() {
    let selectedDates = ref<Array<string>>([]);
    const config = new ZTCalendarConfig();
    return {
        selectedDates,
        config
    }
}

```
config 中可以实现 `settingDayCb` 方法来自行操作对应的day对象

```
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
```
其余的参数介绍见下面文档，大家有兴趣的可以自己配置试一下~

## Config && Custom Day

-   **ZTCalendarConfig**

| 属性         | 描述                     | 类型                | default      |
| ------------ | ------------------------ | ------------------- | ------------ |
| mode         | 日期选择模式             | Single,Multiple     | Single       |
| lunar        | 是否支持农历（含节假日） | boolean             | false        |
| onlyHoliday  | 仅展示节假日             | boolean             | false        |
| canUseDays   | 日期可用天数             | number              | -1（不限制） |
| startDay     | 日期可用起始日期         | string (YYYY-MM-DD) | 当天         |
| settingDayCb | 自定义 Day 对象回调      | Fucntion            |

API

```
/**
 * 根据canUseDays获取月份长度，默认 3个月
 * @returns number 生成的最小月数
 */
getMonthLength()

```

-   **ZTCalendarDay**
    | 属性 | 描述 | 类型 | default |
    | ------------ | ------------------------ | ------------------- | ------------ |
    | format | day 格式化（YYYY-MM-DD）| string | today|
    | color | 日期字体颜色 | string | #333 |
    | alias | 日期别名（今天、明天）| string | #ff8400 |
    | bottomDesc | 日期底部描述 | string | #333 |
    | lunar | 是否开启农历 | boolean | false |
    | holiday | 是否展示节假日 | boolean | false |
    | isWork | 是否补班日 | boolean | false |
    | isRest | 是否休假日 | boolean | false |

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Run your unit tests

```
yarn test:unit
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
