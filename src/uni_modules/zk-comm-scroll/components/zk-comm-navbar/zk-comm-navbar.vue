<template>
  <view class="navbar">
    <uni-nav-bar :fixed="true" :statusBar="true">
      <view class="navbar_title">
        <text>{{ title }}</text>
      </view>
      <template v-slot:left>
        <view v-if="isLeft" @click="back" class="navbar_left">
          <uni-icons type="back" size="20"></uni-icons>
          返回
        </view>
      </template>
      <template v-slot:left>
        <slot name="right" />
      </template>
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
}
.navbar_left {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.navbar {
}
</style>
