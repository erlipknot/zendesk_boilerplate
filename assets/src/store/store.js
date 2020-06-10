import i18n from '../i18n/en-US.js';
import Months from './modules/months.js'

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
    const parse = path => {
      const parts = path.split('/');

      let rolling = Store;

      for (let part of parts) {
        if (rolling === Store && rolling.modules.hasOwnProperty(part)) {
          rolling = rolling.modules[part];
        } else if (rolling.hasOwnProperty(part)) {
          rolling = rolling[part];
        } else {
          return null;
        }
      }

      return rolling;
    };

    switch (typeof path) {
      case 'string': {
        const res = parse(path);

        if (typeof res === 'function') {
          return {
            [res.name]: res
          };
        } else {
          return res;
        }
      }
      case 'object': {
        let methods = {};

        if (Array.isArray(path)) {
          for (const part of path) {
            const res = parse(part);

            if (typeof res === 'function') {
              methods = {
                [res.name]: res
              };
            } else {
              methods = {
                ...methods,
                ...res
              };
            }
          }

          return methods;
        } else {
          for (const key in path) {
            methods[key] = parse(path[key]);
          }
        }

        return methods;
      }
      default:
        return null;
    }
  }
};


export default Store;
