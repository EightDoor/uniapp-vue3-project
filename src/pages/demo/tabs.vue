<template>
  <view>
    <zk-comm-scroll
      :isLeft="true"
      isTab
      :list="list"
      title="tabs"
      @changeIndex="changeIndex"
    >
      <uni-list class="test" v-if="current === 0">
        <uni-list-item title="123">
        </uni-list-item>
        <uni-list-item  title="123">
        </uni-list-item>
        <uni-list-item  title="123">
        </uni-list-item>
      </uni-list>
      <text v-if="current === 1">123</text>
    </zk-comm-scroll>
  </view>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import log from '@/uni_modules/zk-comm-scroll/utils/log';

export default defineComponent({
  name: 'DemoTabs',
  setup() {
    const list = ref([
      '第一',
      '第二',
      '第一',
      '第一',
      '第一',
      '第一项',
      '第一项',
      '第一项',
      '第一项',
    ]);
    const current = ref(0);

    function changeIndex(val: number) {
      log.d(val, 'v');
      current.value = val;
    }
    return {
      list,
      current,
      changeIndex,
    };
  },
});
</script>
<style scoped lang="scss">
.test {
  background: white;
  width: 100%;
}
</style>
