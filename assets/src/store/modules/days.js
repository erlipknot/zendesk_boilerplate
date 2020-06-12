const Days = {
  state: Vue.observable({
    days: ['Mon', 'Tues']
  }),

  getters: {
    getDays: () => Days.state.days
  },

  methods: {
    addDay(newDay) {
      Days.state.days.push(newDay);
    }
  }
};

export default Days;