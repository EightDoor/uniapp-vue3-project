<template>
  <view>
    <zk-comm-scroll
      :isLeft="true"
      isTab
      :list="list"
      title="tabs"
      @changeIndex="changeIndex"
    >
      <uni-list class="test" v-show="current === 0">
        <uni-list-item>
          <text style="height: 200px; width: 100%; border: 1px solid red">12</text>
        </uni-list-item>
        <uni-list-item>
          <text style="height: 200px; width: 100%; border: 1px solid red">12</text>
        </uni-list-item>
        <uni-list-item>
          <text style="height: 200px; width: 100%; border: 1px solid red">12</text>
        </uni-list-item>
      </uni-list>
      <text v-show="current === 1">123</text>
    </zk-comm-scroll>
  </view>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

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
