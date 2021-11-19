<template>
  <view>
    <scroll-view
      class="scroll_view"
        :enable-back-to-top="true"
        :show-scrollbar="true"
        :refresher-enabled="refresh"
        :refresher-threshold="45"
        :scroll-anchoring="true"
        :refresher-triggered="triggered"
        @refresherrestore="onRestore"
        @refresherrefresh="refresherrefresh"
        @refresherabort="onAbort"
        :scroll-top="scrollTop" scroll-y="true"
        @scrolltoupper="upper"
        @scrolltolower="lower"
        @scroll="scroll"
      >
      <view class="content_container">
       <slot/>
       <uni-load-more v-if="refresh" :status="more"></uni-load-more>
      </view>
      </scroll-view>
  </view>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import Toast from '@/utils/toast';
import log from '@/utils/log';

type LoadMore = 'more' | 'loading' | 'noMore';
export default defineComponent({
  name: 'ComContent',
  props: {
    refresh: {
      type: Boolean,
      default: false,
    },
    page: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      default: 10,
    },
  },
  emits: ['refresh', 'loadMore', 'update:page', 'update:size'],
  setup(props, { emit }) {
    const scrollTop = ref(0);
    const triggered = ref<boolean | string>(false);
    const more = ref<LoadMore>('more');

    // 滚动到顶部
    function upper(e: any) {
      // log.d(e, '滚动到顶部了');
    }
    // 滚动到底部
    function lower(e: any) {
      if (more.value === 'more') {
        more.value = 'loading';
        emit('update:page', props.page + 1);
        emit('loadMore', (val: any[]) => {
          if (val.length < props.size) {
            more.value = 'noMore';
          } else {
            more.value = 'more';
          }
        });
      }
    }
    // 滚动
    function scroll(e: any) {
      // log.d(e, '滚动')
    }

    // 自定义下拉刷新被触发
    function refresherrefresh() {
      triggered.value = true;
      emit('update:page', 1);
      emit('refresh', () => {
        triggered.value = false;
        more.value = 'more';
        Toast.showMsg('刷新成功');
      });
    }
    // 自定义下拉刷新被复位
    function onRestore() {
      // 需要重置
      triggered.value = 'restore';
    }
    // 自定义下拉刷新被中止
    function onAbort() {

    }
    return {
      scrollTop,
      upper,
      lower,
      scroll,

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
</style>
