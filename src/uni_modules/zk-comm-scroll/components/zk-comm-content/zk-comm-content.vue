<template>
  <view class="content_contailer">
    <scroll-view
      :class="{ scroll_view: !isTab, scroll_view_tab: isTab }"
      :enable-back-to-top="true"
      :show-scrollbar="true"
      :scroll-anchoring="true"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      :scroll-top="scrollTop"
      scroll-y="true"
      @scrolltoupper="upper"
      @scrolltolower="lower"
      @scroll="scroll"
      :scroll-with-animation="true"
    >
      <view class="content_container">
          <zk-comm-refresh :moveYPosition="moveYPosition" :refreshStatus="refreshStatus"/>
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
import {
  defineComponent, ref, nextTick, reactive, watch,
} from 'vue';
import Toast from '../../utils/toast';
import log from '../../utils/log';
import { CallLoadMoreType, ReeshStatusType } from '../../types';
import Config from '../../config/index';

type LoadMore = 'more' | 'loading' | 'noMore';

export default defineComponent({
  name: 'ComContent',
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
  emits: ['refresh', 'loadMore', 'update:size', 'onScroll', 'goTop'],
  setup(props, { emit }) {
    const scrollTop = ref(0);
    const scrollOldTop = ref(0);
    const triggered = ref<boolean | string>(false);
    const more = ref<LoadMore>('more');
    const isShowTop = ref('none');
    const pageNum = ref(1);
    const pageSize = ref(10);
    // 滚动到顶部
    function upper(e: any) {
      // log.d(e, '滚动到顶部了');
    }
    // 滚动到底部
    function lower(e: any) {
      if (more.value === 'more') {
        more.value = 'loading';
        pageNum.value += 1;
        emit('loadMore', {
          done: (val: any[]) => done(val, 'load'),
          page: pageNum.value,
          size: pageSize.value,
        });
      }
    }

    // 加载数据
    function done(val: any[], status: 'load' | 'refresh') {
      if (status === 'refresh') {
        triggered.value = false;
        more.value = 'more';
        Toast.showMsg('刷新成功');
        pageNum.value = 1;
        refreshStatus.value = ReeshStatusType.DONE;
        touchSourceData.x = 0;
        touchSourceData.y = 0;
        return;
      }
      if (val.length < props.size) {
        more.value = 'noMore';
      } else {
        more.value = 'more';
      }
    }
    // 滚动
    function scroll(e: any) {
      // log.d(e, '滚动');
      scrollOldTop.value = e.detail.scrollTop;
      emit('onScroll', e);
      if (e.detail.scrollTop > props.topThreshold) {
        isShowTop.value = 'block';
      } else {
        isShowTop.value = 'none';
      }
    }
    function refreshFun() {
      emit('loadMore', {
        done: (val: any[]) => done(val, 'refresh'),
        page: 1,
        size: pageSize.value,
      } as CallLoadMoreType);
    }

    const touchSourceData = reactive({
      x: 0,
      y: 0,
    });
    // 移动位置
    const moveYPosition = ref<number>(0);
    const refreshStatus = ref<ReeshStatusType>(ReeshStatusType.NONE);
    function formatTouchXy(event: any) {
      const x = event.touches[0].pageX;
      const y = event.touches[0].pageY;
      return {
        x, y,
      };
    }

    function onTouchStart(event: any) {
      if (scrollOldTop.value <= Config.triggerCriticalValue && props.refresh) {
        touchSourceData.x = formatTouchXy(event).x;
        touchSourceData.y = formatTouchXy(event).y;
        refreshStatus.value = ReeshStatusType.NONE;
      }
    }

    function onTouchMove(event: any) {
      if (scrollOldTop.value <= Config.triggerCriticalValue && props.refresh) {
        const { y } = formatTouchXy(event);
        const movingPosition = touchSourceData.y - y;
        log.d(movingPosition, '结果值');
        moveYPosition.value = movingPosition;
      }
    }
    function onTouchEnd() {
      if (props.refresh) {
        log.d('结束');
        const posi = Math.abs(moveYPosition.value);
        if (posi > Config.triggerCriticalValue) {
          refreshStatus.value = ReeshStatusType.FRESH_LOADING;
          refreshFun();
        }
      }
    }

    function scrollTopFun() {
      scrollTop.value = scrollOldTop.value;
      nextTick(() => {
        scrollTop.value = 0;
      });
      refreshFun();
    }

    watch(refreshStatus, (newVal) => {
      if (newVal === ReeshStatusType.DONE) {
        setTimeout(() => {
          moveYPosition.value = 0;
        }, 1000);
      }
    });
    return {
      scrollTop,
      upper,
      lower,
      scroll,
      isShowTop,
      triggered,
      more,
      scrollTopFun,

      // 自定义下拉刷新
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      moveYPosition,
      refreshStatus,
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
  /*  #ifdef  MP-ALIPAY||MP-TOUTIAO||MP-LARK | MP-QQ||MP-KUAISHOU|| MP-360 || QUICKAPP-WEBVIEW */
    height: 100vh;
  /*  #endif  */
}
.scroll_view_tab {
  height: calc(100vh - $navBarHeight - $tabBarHeight - 50px);
  /*  #ifdef  MP-ALIPAY||MP-TOUTIAO||MP-LARK | MP-QQ||MP-KUAISHOU|| MP-360 || QUICKAPP-WEBVIEW */
    height: 100vh;
  /*  #endif  */
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
