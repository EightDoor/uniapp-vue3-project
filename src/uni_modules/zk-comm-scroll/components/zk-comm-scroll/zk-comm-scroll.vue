<template>
  <view>
    <nav-bar :title="title" :isLeft="isLeft">
      <slot name="navBarRight" />
    </nav-bar>
    <scroll-view v-if="isTab" class="tabs_title_container" scroll-x="true">
      <view :class="{ tabs_title_for: list.length <= 4 }">
        <view
          @click="change(index)"
          v-for="(item, index) in list"
          :key="index"
          class="tabs_title"
          :style="{
            width: width,
            borderBottom: `1px solid ${current === index ? activeColor : 'transpart'}`,
          }"
        >
          <text :style="{ color: current === index ? activeColor : defaultTextColor }">
            {{ item }}
          </text>
        </view>
      </view>
    </scroll-view>
    <custom-content
      :refresh="refresh"
      @loadMore="loadMore"
      @onScroll="onScroll"
      @goTop="goTop"
      :isTab="isTab"
    >
      <slot />
    </custom-content>
  </view>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import NavBar from "../zk-comm-navbar/zk-comm-navbar.vue";
import CustomContent from "../zk-comm-content/zk-comm-content.vue";
import log from "../../utils/log";
import { CallLoadMoreType } from "../../types";

export default defineComponent({
  name: "ComIndex",
  components: {
    NavBar,
    CustomContent,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    isLeft: {
      type: Boolean,
      default: false,
    },
    refresh: {
      type: Boolean,
      default: false,
    },
    isTab: {
      type: Boolean,
      default: false,
    },
    activeColor: {
      type: String,
      default: "#4cd964",
    },
    // button text
    width: {
      type: String,
      default: "50px",
    },
    ceilingHeight: {
      type: Number,
      default: 30,
    },
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  emits: [
    "refresh",
    "loadMore",
    "update:page",
    "update:size",
    "onScroll",
    "goTop",
    "changeIndex",
  ],
  setup(props, { emit }) {
    const pageNum = ref(1);
    const pageSize = ref(10);

    function loadMore(data: CallLoadMoreType) {
      emit("loadMore", data);
    }

    function updatePage(val: number) {
      emit("update:page", val);
    }

    function updateSize(val: number) {
      emit("update:size", val);
    }

    function onScroll(e: any) {
      emit("onScroll", e);
    }

    function goTop() {
      emit("goTop");
    }

    const defaultTextColor = "black";
    const current = ref(0);
    function change(val: number) {
      current.value = val;
      emit("changeIndex", val);
    }

    return {
      pageNum,
      pageSize,
      loadMore,
      updatePage,
      updateSize,
      onScroll,
      goTop,

      change,
      current,
      defaultTextColor,
    };
  },
});
</script>
<style lang="scss" scoped>
// var(--status-bar-height)
$navBarHeight: 20px;
$tabBarHeight: 50px;
.content_container {
  padding: 5px 15px;
}
.scroll_view {
  height: calc(100vh - $navBarHeight - $tabBarHeight);
}

$tabsHeight: 30x;
$tabsPaddingBo: 10px;
.title_base {
}
.tabs_title_container {
  white-space: nowrap;
  margin-bottom: $tabsPaddingBo;
  height: $tabsHeight;
  padding-top: 10px;

  .tabs_title_for {
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-around;
  }
  .tabs_title {
    display: inline-block;
    margin-right: 10px;
    padding-bottom: 5px;
    text-align: center;
  }
}
</style>
