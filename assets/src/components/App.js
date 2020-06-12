const template = `
<div class="app-container">
  <div class="app-container__counter">
    <div class="app-container__result">
      {{ newCounter }}
    </div>
    <button
      class="c-btn"
      @click="increaseCounter">{{ i18n.addOneButton }}</button>
  </div>
  <div class="app-container__months">
    <ul class="app-container__months-elements">
      <li v-for="month in getMonths">{{ month }}</li>
    </ul>
    <input
      class="c-txt__input app-container__months-elements"
      :placeholder="i18n.insertMonth"
      type="text"
      v-model="newMonth"
      v-on:keyup.enter="addNewMonth">
    <button
      class="c-btn app-container__months-elements"
      @click="addNewMonth">{{ i18n.addMonthButton }}</button>
  </div>

  <div class="app-container__days">
    <ul class="app-container__days-elements">
      <li v-for="day in getDays">{{ day }}</li>
    </ul>
    <input
      class="c-txt__input app-container__days-elements"
      :placeholder="i18n.insertDay"
      type="text"
      v-model="newDay"
      v-on:keyup.enter="addNewDay">
    <button
      class="c-btn app-container__days-elements"
      @click="addNewDay">{{ i18n.addDayButton }}</button>
  </div>
</div>`;

import ZDClient from '../services/ZDClient.js';
import Store from "../store/store.js";

const App = {
  template,
  data() {
    return {
      newMonth: '',
      newDay: '',
      ...Store.import(['state'])
    }
  },
  computed: {
    ...Store.import(['getters', 'Months/getters', 'Days/getters'])
  },
  methods: {
    ...Store.import(['methods', 'Months/methods', 'Days/methods']),
    /*     ...Store.import({
          addOne: 'methods/increaseCounter',
          addMonth: 'Months/methods/addMonth'
        }), */
    addNewMonth() {
      this.addMonth(this.newMonth);
      this.newMonth = '';
    },
    addNewDay() {
      this.addDay(this.newDay);
      this.newDay = '';
    }
  },
  mounted() {

    ZDClient.resizeFrame(this.$el.scrollHeight);
  },
  updated() {
    ZDClient.resizeFrame(this.$el.scrollHeight);
  },
};

export default App;
