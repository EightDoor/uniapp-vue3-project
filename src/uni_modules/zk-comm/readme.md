# 环境
- scss、typescript、vue3、lodash
- 需要安装uni-ui
  - 详细配置参考[地址](https://uniapp.dcloud.io/component/uniui/quickstart?id=npm%e5%ae%89%e8%a3%85)

# 功能介绍
- 上拉加载,下拉刷新
  - 分页加载数据
- 自定义导航栏

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
- 页面自定义了导航栏,需要配置开启自定义导航栏
  - pages.json 配置 navigationStyle 为custom
```json
	"globalStyle": {
    // ...
    "navigationStyle": "custom"
	}
```
# 参数
## zk-comm-content

### props

| 参数         | 说明         | 类型    | 默认值 | 是否必填 |
| ------------ | ------------ | ------- | ------ | -------- |
| refresh      | 下拉刷新     | Boolean | false  | 否       |
| page         | 页数         | Number  | 1      | 否       |
| size         | 每页条数     | Number  | 10     | 否       |
| topThreshold | 返回顶部阈值 | Number  | 100    | 否       |

### emits

| 参数         | 说明         | 类型     | 默认值 |
| ------------ | ------------ | -------- | ------ |
| @refresh     | 下拉刷新     | Function |        |
| @loadMore    | 加载更多     | Function |        |
| @update:page | 页数更新     | Function |        |
| @update:size | 每页条数更新 | Function |        |

## zk-comm-scroll

### props

| 参数    | 说明               | 类型    | 默认值 | 是否必填 |
| ------- | ------------------ | ------- | ------ | -------- |
| refresh | 下拉刷新           | Boolean | false  | 否       |
| page    | 页数               | Number  | 1      | 否       |
| size    | 每页条数           | Number  | 10     | 否       |
| isLeft  | 是否有左侧返回按钮 | Boolean | false  | 否       |
| title   | 标题               | String  | false  | 否       |

### emits

| 参数         | 说明         | 类型     | 默认值 |
| ------------ | ------------ | -------- | ------ |
| @refresh     | 下拉刷新     | Function |        |
| @loadMore    | 加载更多     | Function |        |
| @update:page | 页数更新     | Function |        |
| @update:size | 每页条数更新 | Function |        |

## zk-comm-navbar

| 参数   | 说明               | 类型   | 默认值 |
| ------ | ------------------ | ------ | ------ |
| title  | 标题               | String |        |
| isLeft | 是否有左侧返回按钮 | String | false  |


# 使用示例
```vue
<template>
   <zk-comm-scroll title="加载更多"
    :refresh="true"
    @refresh="refresh"
    :page="page"
    :size="size"
    @update:page="updatePage"
    @update:size="updateSize"
    @load-more="loadMore"
   >
      <view v-for="(item, index) in list" :key="index" style="border: 1px solid red;height: 100px">
        <text>{{item.id}} {{item.title}}</text>
      </view>
    </zk-comm-scroll>
</template>

<script lang="ts">
import {
  defineComponent, ref, onMounted,
} from 'vue';
import { cloneDeep } from 'lodash';

interface List {
  title: string;
  id: number
}
export default defineComponent({
  name: 'PagesLoadMore',
  setup() {
    const page = ref(1);
    const size = ref(10);
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
    function loadMore(done: Function) {
      const result = cloneDeep(sourceList.value);
      const v = result.splice((page.value - 1) * size.value, 10);
      setTimeout(() => {
        done(v);
        list.value = list.value.concat(v);
      }, 2000);
    }
    // 刷新
    function refresh(done: Function) {
      setTimeout(() => {
        done();
        const result = cloneDeep(sourceList.value);
        list.value = result.splice(0, 10);
      }, 2000);
    }

    function updatePage(val: number) {
      page.value = val;
    }
    function updateSize(val: number) {
      size.value = val;
    }

    return {
      refresh,
      page,
      size,
      loadMore,
      list,
      updatePage,
      updateSize,
    };
  },
});
</script>

<style>

</style>

```
