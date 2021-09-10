<template>
    <div class="nav_bar flex_row flex_between flex_cross_center">
        <span class="flex_1">&#8203; <span v-if="canBack" @click="backAction">返回</span></span>
        <span class="title flex_2">{{ navTitle }}</span>
        <span class="flex_1 flex_row flex_end">
            &#8203;
            <slot></slot>
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        navTitle: String,
        canBack: {
            type: Boolean,
            default: true,
        },
    },
    setup(props, context) {
        return {
            backAction: () => {
                context.emit("back");
            },
        };
    },
});
</script>

<style scoped>
.nav_bar {
    height: 44px;
    width: 100%;
    font-size: 15px;
    font-weight: 600;
    color: #fff;
    background-color: #00a4ff;
    box-sizing: border-box;
    padding: 0 20px;
}
.title {
    font-size: 20px;
    text-align: center;
}

.flex_2 {
    flex: 2;
}
</style>
