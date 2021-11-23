<template>
   <zk-comm-scroll title="首页"
   >
    <uni-list>
        <uni-list-item
        v-for="(item, index) in list"
        :key="index"
          clickable rightText="点击跳转"
          :title="item.title"
          @click="goLoadMore(item.path)"
        ></uni-list-item>
    </uni-list>
    </zk-comm-scroll>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PagesIndex',
  setup() {
    const list = [
      {
        title: '加载更多',
        path: '/pages/demo/load_more',
      },
      {
        title: 'tabs简单使用',
        path: '/pages/demo/tabs',
      },
      {
        title: 'tabs复杂使用(上拉加载，下拉刷新)',
        path: '/pages/demo/tabs_complex',
      },
      {
        title: 'vuex',
        path: '/pages/demo/counter',
      },
    ];
    function goLoadMore(url: string) {
      uni.navigateTo({
        url,
      });
    }
    return {
      goLoadMore,
      list,
    };
  },
});
</script>

<style>

</style>
