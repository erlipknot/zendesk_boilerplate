let CLIENT = null;
let APP_SETTINGS = null;

const ZDClient = {

  events: {
    ON_APP_REGISTERED(cb) {
      return CLIENT.on('app.registered', async (data) => {
        APP_SETTINGS = data.metadata.settings;
        let accountLocale = await ZDClient.request({ url: '/api/v2/locales.json' });
        if (accountLocale) accountLocale = accountLocale.locales.filter((locale) => { return locale.default === true; })
        return cb(accountLocale[0].locale);
      });
    },
  },

  init() {
    CLIENT = ZAFClient.init();
  },

  /**
   * Set getters for privite objects
   */
  app: {
    get settings() { return APP_SETTINGS; },

    /**
     * It returns true if the app is installed in the instance, false if
     * it's running locally
     */
    get isProduction() { return !!this.settings['IS_PRODUCTION']; },
  },

  /**
   * @returns {Promise}
   */
  async request(data) {
    return await CLIENT.request(data);
  },
  /**
   * It gets the current user locale.
   * @returns {Object}
   */
  async getCurrentUserLocale() {
    return CLIENT.get('currentUser.locale');
  },
  /**
   * It sets the frame height using on the passed value.
   * If no value has been passed, 80 will be set as default heigth.
   * @param {Int} newHeight
   */
  resizeFrame(appHeight) {
    CLIENT.invoke('resize', { width: '100%', height: `${appHeight}px` });
  },
};

export default ZDClient;
