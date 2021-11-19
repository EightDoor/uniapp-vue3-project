<template>
   <com-content title="首页"
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
    const list = [
      {
        title: '加载更多',
        path: '/pages/demo/load_more',
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
