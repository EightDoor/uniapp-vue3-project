<template>
  <view>
   <uni-nav-bar
   :fixed="true"
   :statusBar="true"
   >
   <view class="navbar_title">
     <text>{{title}}</text>
   </view>
   <view class="navbar_left" @click="back" v-if="isLeft" slot="left">
      <uni-icons type="back" size="20"></uni-icons> 返回
   </view>
   <view slot="right">
      <slot name="right"/>
   </view>
   </uni-nav-bar>
  </view>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
    isLeft: {
      type: Boolean,
      default: false,
    },
  },
  name: 'NavBar',
  setup() {
    function back() {
      uni.navigateBack({
        delta: 1,
      });
    }
    return {
      back,
    };
  },
});
</script>
<style lang="scss" scoped>
.navbar_title {
  text-align: center;
  width: 100%;
}
.navbar_left {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
