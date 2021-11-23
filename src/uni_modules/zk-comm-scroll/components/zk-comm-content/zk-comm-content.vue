<template>
  <view class="content_contailer">
    <scroll-view
      :class="{ scroll_view: !isTab, scroll_view_tab: isTab }"
      :enable-back-to-top="true"
      :show-scrollbar="true"
      :refresher-enabled="refresh"
      :refresher-threshold="45"
      :scroll-anchoring="true"
      :refresher-triggered="triggered"
      @refresherrestore="onRestore"
      @refresherrefresh="refresherrefresh"
      @refresherabort="onAbort"
      :scroll-top="scrollTop"
      scroll-y="true"
      @scrolltoupper="upper"
      @scrolltolower="lower"
      @scroll="scroll"
      :scroll-with-animation="true"
    >
      <view class="content_container">
        <slot />
        <uni-load-more v-if="refresh" :status="more"></uni-load-more>
      </view>
    </scroll-view>
    <view>
      <image
        @click="scrollTopFun"
        class="content_image"
        :style="{ display: isShowTop }"
        src="http://vue3.admin.qiniu.start6.cn/%E8%BF%94%E5%9B%9E%E9%A1%B6%E9%83%A8.png"
      />
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from "vue";
import Toast from "../../utils/toast";
import log from "../../utils/log";
import { CallLoadMoreType } from "../../types";
type LoadMore = "more" | "loading" | "noMore";

export default defineComponent({
  name: "ComContent",
  props: {
    refresh: {
      type: Boolean,
      default: false,
    },
    size: {
      type: Number,
      default: 10,
    },
    // 返回顶部阈值
    topThreshold: {
      type: Number,
      default: 100,
    },
    isTab: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["refresh", "loadMore", "update:size", "onScroll", "goTop"],
  setup(props, { emit }) {
    const scrollTop = ref(0);
    const scrollOldTop = ref(0);
    const triggered = ref<boolean | string>(false);
    const more = ref<LoadMore>("more");
    const isShowTop = ref("none");
    const pageNum = ref(1);
    const pageSize = ref(10);
    // 滚动到顶部
    function upper(e: any) {
      // log.d(e, '滚动到顶部了');
    }
    // 滚动到底部
    function lower(e: any) {
      if (more.value === "more") {
        more.value = "loading";
        pageNum.value += 1;
        emit("loadMore", {
          done: (val: any[]) => done(val, "load"),
          page: pageNum.value,
          size: pageSize.value,
        });
      }
    }

    // 加载数据
    function done(val: any[], status: "load" | "refresh") {
      if (status === "refresh") {
        triggered.value = false;
        more.value = "more";
        Toast.showMsg("刷新成功");
        pageNum.value = 1;
        return;
      }
      if (val.length < props.size) {
        more.value = "noMore";
      } else {
        more.value = "more";
      }
    }
    // 滚动
    function scroll(e: any) {
      // log.d(e, '滚动');
      emit("onScroll", e);
      scrollOldTop.value = e.detail.scrollTop;
      if (e.detail.scrollTop > props.topThreshold) {
        isShowTop.value = "block";
      } else {
        isShowTop.value = "none";
      }
    }
    function refreshFun() {
      emit("loadMore", {
        done: (val: any[]) => done(val, "refresh"),
        page: 1,
        size: pageSize.value,
      } as CallLoadMoreType);
    }
    // 自定义下拉刷新被触发
    function refresherrefresh() {
      triggered.value = true;
      refreshFun();
    }
    // 自定义下拉刷新被复位
    function onRestore() {
      // 需要重置
      triggered.value = "restore";
    }
    // 自定义下拉刷新被中止
    function onAbort() {}
    function scrollTopFun() {
      scrollTop.value = scrollOldTop.value;
      nextTick(() => {
        scrollTop.value = 0;
        // 刷新页面
        refreshFun();
        emit("goTop");
      });
    }
    return {
      scrollTop,
      upper,
      lower,
      scroll,
      isShowTop,
      scrollTopFun,
      // 自定义下拉刷新
      refresherrefresh,
      triggered,
      onRestore,
      onAbort,
      more,
    };
  },
});
</script>
<style lang="scss" scoped>
// var(--status-bar-height)
$navBarHeight: 20px;
$tabBarHeight: 50px;
.content_container {
  padding: 15px;
}
.scroll_view {
  height: calc(100vh - $navBarHeight - $tabBarHeight);
}
.scroll_view_tab {
  height: calc(100vh - $navBarHeight - $tabBarHeight - 50px);
}
.content_image {
  display: none;
  position: fixed;
  bottom: 15px;
  right: 15px;
  width: 20px;
  height: 20px;
}
.content_contailer {
}
</style>
