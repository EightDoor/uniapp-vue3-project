<template>
  <zk-comm-scroll isLeft title="网络请求">
     <button type="primary" @click="initiateRequest">点击发起请求</button>
     <view style="border: 1px solid red;margin-bottom: 15px"
     v-for="(item, index) in data" :key="index">
       <text>{{item.title}}</text>
     </view>
  </zk-comm-scroll>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import req from '@/uni_modules/zk-comm-scroll/utils/request';
import log from '@/uni_modules/zk-comm-scroll/utils/log';

interface DataType {
  title: string;
}
export default defineComponent({
  name: 'DemoNetwork',
  setup() {
    const data = ref<DataType[]>([]);
    function initiateRequest() {
      // 发起请求
      req('https://xka.start6.cn/api/list', 'GET').then((res) => {
        log.d(res, '请求结果');
        data.value = res.data;
      });
    }
    return {
      initiateRequest,
      data,
    };
  },
});
</script>
