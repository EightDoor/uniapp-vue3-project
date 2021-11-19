<template>
  <com-content title="我的">
    <view>
      <text>我的</text>
    </view>
  </com-content>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ComContent from '@/components/Content/index.vue';

export default defineComponent({
  name: 'PagesMy',
  components: {
    ComContent,
  },
  setup() {
    return {};
  },
});
</script>
