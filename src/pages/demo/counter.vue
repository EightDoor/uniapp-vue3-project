<template>
  <zk-comm-scroll title="vuex" :isLeft="true">
      <view>
        <button type="button" @click="add(count)">添加</button>
        <text>
          {{count}}
        </text>
      </view>
  </zk-comm-scroll>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useCounterStore } from '@/store/counter';

export default defineComponent({
  name: 'DemoCounter',
  setup() {
    const counter = useCounterStore();
    function add(val: number) {
      counter.setCount(val);
    }
    return {
      count: computed(() => counter.count),
      add,
    };
  },
});
</script>
