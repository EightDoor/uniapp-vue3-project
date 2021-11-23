# 环境
- scss、typescript、vue3
- 需要安装uni-ui
  - 详细配置参考[地址](https://uniapp.dcloud.io/component/uniui/quickstart?id=npm%e5%ae%89%e8%a3%85)

# 功能介绍
- 上拉加载,下拉刷新
  - 分页加载数据
- 自定义导航栏

# 存在问题

- v-model:xxx 无法使用

# 目录结构

- components
  - zk-comm-content
    - zk-comm-content.vue 内容区域
    - zk-comm-navbar.vue 自定义导航栏
    - zk-comm-scroll.vue 上拉加载,下拉刷新
- utils目录
  - log.ts log日志输出
  - toast.ts 提示
# 其他

- <font color="red">uniapp、vue3、typescript 基础项目</font>
  - [github地址](https://github.com/EightDoor/uniapp-vue3-project)

- 页面自定义了导航栏,需要配置开启自定义导航栏
  - pages.json 配置 navigationStyle 为custom
```json
	"globalStyle": {
    // ...
    "navigationStyle": "custom"
	}
```
# 

# 使用示例
```vue
<template>
  <zk-comm-scroll title="加载更多" :isLeft="true" :refresh="true" @load-more="loadMore">
    <view
      v-for="(item, index) in list"
      :key="index"
      style="border: 1px solid red; height: 100px"
    >
      <text>{{ item.id }} {{ item.title }}</text>
    </view>
  </zk-comm-scroll>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { cloneDeep } from "lodash";
import log from "@/uni_modules/zk-comm/utils/log";
import { CallLoadMoreType } from "@/uni_modules/zk-comm/types";

export interface List {
  title: string;
  id: number;
}
export default defineComponent({
  name: "PagesLoadMore",
  setup() {
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
    // 加载更多
    function loadMore(data: CallLoadMoreType) {
      log.d(data.page, "page");
      if (data.page === 1) {
        refresh(data);
        return;
      }
      const result = cloneDeep(sourceList.value);
      const v = result.splice((data.page - 1) * data.size, 10);
      log.d(v, "分页的数据");
      setTimeout(() => {
        data.done(v);
        list.value = list.value.concat(v);
      }, 2000);
    }

    // 刷新
    function refresh(data: CallLoadMoreType) {
      setTimeout(() => {
        data.done();
        const result = cloneDeep(sourceList.value);
        list.value = result.splice(0, 10);
      }, 2000);
    }
    return {
      loadMore,
      list,
    };
  },
});
</script>

<style></style>

```
