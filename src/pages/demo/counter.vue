<template>
  <zk-comm-scroll title="pinia" :isLeft="true">
    <view>
      <button type="button" @click="add(count)">添加</button>
      <text>
        {{ count }}
      </text>
    </view>
  </zk-comm-scroll>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useCounterStore } from '@/store/modules/counter';

export default defineComponent({
  name: 'DemoCounter',
  setup() {
    const counter = useCounterStore();
    function add(val: number) {
      counter.setCount(1);
    }
    return {
      count: computed(() => counter.count),
      add,
    };
  },
});
</script>
