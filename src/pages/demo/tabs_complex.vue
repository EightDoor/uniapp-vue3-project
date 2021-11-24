<template>
  <view>
    <zk-comm-scroll
      isTab
      :isLeft="true"
      :refresh="true"
      @load-more="loadMore"
      :list="data"
      @changeIndex="changeIndex"
    >
      <uni-list class="test" v-if="current === 0">
        <uni-list-item
          v-for="(item, index) in list"
          :key="index"
          style="border: 1px solid red; height: 100px"
          :title="item.title"
        >
        </uni-list-item>
      </uni-list>
      <text v-if="current === 1">123</text>
    </zk-comm-scroll>
  </view>
</template>
<script lang="ts">
import { cloneDeep } from 'lodash';
import { defineComponent, onMounted, ref } from 'vue';
import { CallLoadMoreType } from '@/uni_modules/zk-comm-scroll/types';
import log from '@/uni_modules/zk-comm-scroll/utils/log';
import { List } from './load_more.vue';

export default defineComponent({
  name: 'DemoTabs',
  setup() {
    const data = ref([
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

    const list = ref<List[]>([]);
    const sourceList = ref<List[]>([]);

    // moack 数据
    function getList() {
      const result: List[] = [];
      for (let i = 0; i < 35; i += 1) {
        result.push({
          title: `当前是第${i}项`,
          id: i,
        });
      }
      sourceList.value = result;
      const v = cloneDeep(result);
      list.value = cloneDeep(v.splice(0, 10));
    }
    onMounted(() => {
      getList();
    });

    // 刷新
    function refresh(data: CallLoadMoreType) {
      setTimeout(() => {
        data.done();
        const result = cloneDeep(sourceList.value);
        list.value = result.splice(0, 10);
      }, 2000);
    }
    // 加载更多
    function loadMore(data: CallLoadMoreType) {
      // 模拟刷新
      if (data.page === 1) {
        refresh(data);
        return;
      }

      const result = cloneDeep(sourceList.value);
      const v = result.splice((data.page - 1) * data.size, 10);
      log.d(v, '分页的数据');
      setTimeout(() => {
        data.done(v);
        list.value = list.value.concat(v);
      }, 2000);
    }

    return {
      current,
      changeIndex,

      loadMore,
      list,
      data,
    };
  },
});
</script>
<style scoped lang="scss">
.test {
  background: white;
}
</style>
