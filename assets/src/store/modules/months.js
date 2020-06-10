const Months = {
  state: Vue.observable({
    months: ['Jan', 'Feb']
  }),

  getters: {
    getMonths: () => Months.state.months
  },

  methods: {
    addMonth(newMonth) {
      Months.state.months.push(newMonth);
    }
  }
};

export default Months;