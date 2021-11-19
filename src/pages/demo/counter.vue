<template>
  <com-content title="vuex" :isLeft="true">
      <view>
        <button type="button" @click="add(count)">添加</button>
        <text>
          {{count}}
        </text>
      </view>
  </com-content>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import ComContent from '@/components/Content/index.vue';

export default defineComponent({
  name: 'DemoCounter',
  components: {
    ComContent,
  },
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
