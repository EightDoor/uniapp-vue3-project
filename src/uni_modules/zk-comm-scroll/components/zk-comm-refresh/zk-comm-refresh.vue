<template>
  <view class="refresh" :style="{height: height, display: formatDisplay, lineHeight: height}">
    <text>{{formatText(refreshStatus)}}</text>
  </view>
</template>
<script lang="ts">
import {
  computed,
  defineComponent, PropType, ref, watch,
} from 'vue';
import { ReeshStatusType } from '../../types';
import log from '../../utils/log';
import utils from '../../utils/index';

export default defineComponent({
  name: 'ZkCommRefresh',
  props: {
    moveYPosition: {
      type: Number,
      required: true,
    },
    refreshStatus: {
      type: Number as PropType<ReeshStatusType>,
      required: true,
    },
  },
  setup(props) {
    // 滚动超出边界阈值
    const maxHeight = 100;
    // 触发刷新临界值，解决初次加载position=0也触发相应的逻辑,小于直接不刷新
    const triggerCriticalValue = 10;
    const position = ref(0);

    const height = computed(() => {
      const posi = Math.abs(position.value);
      let heigth = 0;
      if (posi > triggerCriticalValue) {
        if (posi <= maxHeight) {
          heigth = posi;
        } else if (posi >= maxHeight) {
          heigth = maxHeight;
        }
      }
      return `${heigth}px`;
    });
    const formatDisplay = computed(() => {
      let display = 'none';
      const posi = Math.abs(position.value);
      if (posi > triggerCriticalValue) {
        if (posi <= maxHeight) {
          display = 'block';
        } else if (posi >= maxHeight) {
          display = 'block';
        }
      }

      return display;
    });

    function formatText(text: ReeshStatusType) {
      let result = '刷新中...';
      if (text === ReeshStatusType.FRESH_LOADING) {
        result = '刷新中...';
      } else if (text === ReeshStatusType.NONE) {
        result = '释放刷新';
      } else if (text === ReeshStatusType.DONE) {
        result = `更新时间为: ${utils.formatTime(Date.now())}`;
      }
      return result;
    }

    watch(() => props.moveYPosition, (newVal) => {
      position.value = newVal;
    });
    return {
      formatDisplay,
      height,
      formatText,
    };
  },
});
</script>
<style scoped lang="scss">
.refresh {
  height: 0;
  margin-bottom: 15px;
  text-align: center;
}
</style>
