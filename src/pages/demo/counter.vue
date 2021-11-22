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
import { useStore } from 'vuex';

export default defineComponent({
  name: 'DemoCounter',
  setup() {
    const store = useStore();

    function add(val: number) {
      store.commit('counter/setCount', val += 1);
    }
    return {
      count: computed(() => store.state.counter.count),
      add,
    };
  },
});
</script>
