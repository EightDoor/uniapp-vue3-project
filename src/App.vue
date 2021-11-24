<script lang="ts">
import { defineComponent } from 'vue';
import update from './uni_modules/zk-comm-scroll/utils/update';

export default defineComponent({
  onLaunch() {
    console.log('App Launch');
  },
  onShow() {
    console.log('App Show');
    // 更新小程序应用
    update();
  },
  onHide() {
    console.log('App Hide');
  },
});
</script>
<style lang="scss" scoped>
/*每个页面公共css */
body {
  color: red
}
</style>
