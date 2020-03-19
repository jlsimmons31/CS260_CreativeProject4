<template>
<div v-if="this.$root.$data.currentFlightBeingPurchased.length > 0">
  <h3>Before purchasing your flight to {{this.$root.$data.currentFlightBeingPurchased[0].city}} we need just a bit more information about you.</h3>
  <form>
    <input type="text" placeholder="First Name" v-model="firstName">
    <input type="text" placeholder="Last Name">
    <router-link to="/myflights">
    <button @click="addFlight" >Purchase Flight</button>
    </router-link>

  </form>
</div>
</template>


<script>
// import ProductList from "../components/ProductList.vue"
export default {
  name: 'BuyFlight',
  data() {
    return {
      firstName: "",
    }
  },
  computed: {
    
  },
  methods: {
    addFlight() {
    this.$root.$data.myFlights.push(this.$root.$data.currentFlightBeingPurchased[0]);
    }
  },
}
</script>

