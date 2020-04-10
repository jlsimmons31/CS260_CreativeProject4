import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mock from './mock-data.js'

Vue.config.productionTip = false

let data = {
  flights: mock,
  currentFlightBeingPurchased: [],
  myFlights: [],
  // username: "Guest",
  startingCity: "",
  seatType: "",
  currentCustomer: {
    first: "Guest",
    last: "",
    email: "",
    phone: "",
    // fullName() {
    //   return this.last ? this.first + " " + this.last
    //     : this.first;
    // }
  },
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
