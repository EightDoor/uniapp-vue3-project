<template>
  <zk-comm-scroll title="pinia" :isLeft="true">
    <view>
      <button type="button" @click="add()">添加</button>
      <text>
        {{ count }}
      </text>
    </view>
  </zk-comm-scroll>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useCounterStore } from '@/store/modules/counter';
import { log } from '@/utils/log';

export default defineComponent({
  name: 'DemoCounter',
  setup() {
    const counter = useCounterStore();
    function add() {
      log.i(1, '每次点击添加');
      counter.setCount(1);
    }
    return {
      count: computed(() => counter.count),
      add,
    };
  },
});
</script>
