import { createStore, createLogger } from 'vuex';
import Counter from './modules/counter';

const store = createStore({
  plugins: [createLogger()],

  // 开发环境启动开发模式
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    counter: Counter,
  },
});

export default store;
