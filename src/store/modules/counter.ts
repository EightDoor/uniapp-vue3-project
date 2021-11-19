import { Module } from 'vuex';

interface CounterState {
  count: number
}

const Counter: Module<CounterState, CounterState> = {
  namespaced: true,
  state: {
    count: 0,
  },
  mutations: {
    setCount(state, payload: number) {
      state.count = payload;
    },
  },
};

export default Counter;
