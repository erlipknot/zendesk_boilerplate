import App from './components/App.js';
import ZDClient from './services/ZDClient.js';
import Store from './store/store.js';

document.addEventListener('DOMContentLoaded', () => {
  const initVueApp = async (accountLocale) => {
    if (accountLocale) {
      const userLocale = await ZDClient.getCurrentUserLocale();
      if (userLocale) Store.methods.setCurrentUserLocale(userLocale['currentUser.locale'], accountLocale);
      new Vue({
        el: '#app',
        render: h => h(App),
      });
    }
  };

  ZDClient.init();
  ZDClient.events['ON_APP_REGISTERED'](initVueApp);
});