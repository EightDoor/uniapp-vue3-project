<template>
   <com-content title="首页"
   >
    <uni-list>
        <uni-list-item
          clickable rightText="点击跳转"
          title="加载更多"
          @click="goLoadMore"
        ></uni-list-item>
    </uni-list>
    </com-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ComContent from '@/components/Content/index.vue';

export default defineComponent({
  components: {
    ComContent,
  },
  name: 'PagesIndex',
  setup() {
    function goLoadMore() {
      uni.navigateTo({
        url: '/pages/demo/load_more',
      });
    }
    return {
      goLoadMore,
    };
  },
});
</script>

<style>

</style>
