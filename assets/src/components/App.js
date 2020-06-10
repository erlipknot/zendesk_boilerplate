const template = `
<div>
  {{ newCounter }}
  <ul>
    <li v-for="month in getMonths">{{ month }}</li>
  </ul>
  <button
    class="c-btn"
    @click="addOne">Add 1</button>
  <input
    class="c-txt__input"
    placeholder="Insert a Month"
    type="text"
    v-model="newMonth">
  <button
    class="c-btn"
    @click="addMonth(newMonth)">Add Month</button>
</div>`;

import ZDClient from '../services/ZDClient.js';
import Store from "../store/store.js";

const App = {
  template,
  data() {
    return {
      newMonth: ''
    }
  },
  computed: {
    ...Store.import(['getters', 'Months/getters']),
  },
  methods: {
    ...Store.import('methods'),
    ...Store.import(['Months/methods']),
    ...Store.import({ addOne: 'methods/increaseCounter' }),
  },
  mounted() {

  },
  updated() {
    ZDClient.resizeFrame(this.$el.scrollHeight);
  },
};

export default App;
