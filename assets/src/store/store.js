import i18n from '../i18n/dictionary.js';
import Months from './modules/months.js';
import Days from './modules/days.js';
import Router from './router.js';

const Store = {
  state: Vue.observable({
    i18n,
    counter: 0
  }),
  modules: {
    Months,
    Days
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
    },
    setCurrentUserLocale(userLocale, accountLocale) {
      if (i18n[userLocale] === undefined) {
        let variation = userLocale.split('-');
        i18n[variation[0]] === undefined
          ? Store.state.i18n = i18n[accountLocale]
          : Store.state.i18n = i18n[variation[0]]
      } else {
        Store.state.i18n = i18n[userLocale];
      }
    }
  },
  import(path) {
    return Router.import(path, Store);
  }
};

export default Store;