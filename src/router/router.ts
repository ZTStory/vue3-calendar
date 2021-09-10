import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    { path: "/", component: () => import("../components/Index.vue"), name: "Index" },
    { path: "/calendarSelect1", component: () => import("../components/CalendarSelect1.vue"), name: "CalendarSelect1" },
    { path: "/calendarSelect2", component: () => import("../components/CalendarSelect2.vue"), name: "CalendarSelect2" },
    { path: "/calendarSelect3", component: () => import("../components/CalendarSelect3.vue"), name: "CalendarSelect3" },
    { path: "/CalendarSelect4", component: () => import("../components/CalendarSelect4.vue"), name: "CalendarSelect4" },
    { path: "/CalendarSelect5", component: () => import("../components/CalendarSelect5.vue"), name: "CalendarSelect5" },
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
