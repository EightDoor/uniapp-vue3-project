<template>
  <view class="refresh" :style="formatStyle">
    <text>下拉刷新</text>
  </view>
</template>
<script lang="ts">
import {
  computed,
  defineComponent, PropType, ref, watch,
} from 'vue';
import { ReeshStatusType } from '../../types';
import log from '../../utils/log';

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
    const position = ref(0);

    const formatStyle = computed(() => {
      // 滚动超出边界阈值
      const maxHeight = 100;
      const refreshThreshold = 10;
      const posi = Math.abs(position.value);
      const obj = {
        heigth: '0px',
        display: 'block',
      };
      if (position.value <= maxHeight) {
        obj.heigth = `${maxHeight}px`;
        return obj;
      } if (posi >= refreshThreshold) {
        obj.heigth = `${maxHeight}px`;
        return obj;
      }

      obj.display = 'none';
      return obj;
    });

    watch(() => props.moveYPosition, (newVal) => {
      position.value = newVal;
    });
    return {
      formatStyle,
    };
  },
});
</script>
<style scoped lang="scss">
.refresh {
  border: 1px solid red;
  height: 0;
  margin-bottom: 15px;
}
</style>
