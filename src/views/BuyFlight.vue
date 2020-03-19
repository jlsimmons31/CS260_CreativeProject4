<template>
<div v-if="this.$root.$data.currentFlightBeingPurchased.length > 0">
<div class="flightDetails">
   <h2>Flight details</h2>
   <p><strong>Flight from: </strong>{{this.$root.$data.startingCity}}</p>
    <p><strong>Flight to: </strong>{{this.$root.$data.currentFlightBeingPurchased[0].city}}</p>
		
</div>
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
      this.$root.$data.currentFlightBeingPurchased.splice(0, 1);
      if (this.firstName !== ""){
        this.$root.$data.username = this.firstName;
      }
    }
  },
}
</script>

