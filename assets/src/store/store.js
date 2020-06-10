import i18n from '../i18n/en-US.js';
import Months from './modules/months.js';
import Router from './router.js';

const Store = {
  state: Vue.observable({
    i18n,
    counter: 0
  }),
  modules: {
    Months
  },
  getters: {
    i18n() {
      return Store.state.i18n;
    },
    newCounter() {
      return Store.state.counter;
    }
  },
  methods: {
    increaseCounter() {
      Store.state.counter = ++Store.state.counter;
    }
  },
  import(path) {
    return Router.import(path, Store);
  }
};

export default Store;