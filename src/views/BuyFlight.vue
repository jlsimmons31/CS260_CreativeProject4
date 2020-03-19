<template>
<div v-if="this.$root.$data.currentFlightBeingPurchased.length > 0">
<div class="flightDetails">
    <h2><u>Flight details</u></h2>
    <p><strong>Flight from: </strong>{{this.$root.$data.startingCity}}</p>
    <p><strong>Flight to: </strong>{{this.$root.$data.currentFlightBeingPurchased[0].city}}</p>
    <p> Departs at:</p>
    <p><strong>Seat Type:</strong></p>
    <div class="dropdown">
      <button class="dropbtn">{{seatType}}</button>
      <div class="dropdown-content">
        <a @click=" seatType= 'Economy'">Economy</a>
        <a @click=" seatType= 'First Class'">First Class</a>
       </div>
    </div>
     <p v-if="seatType === 'Economy'"> <strong>Ticket Price: </strong>${{this.$root.$data.currentFlightBeingPurchased[0].base_price.toFixed(2)}}</p>
    <p v-else> <strong>Ticket Price: </strong>${{this.$root.$data.currentFlightBeingPurchased[0].first_class_price.toFixed(2)}}</p>
		<br/>
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
      seatType: "Economy",
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


<style scoped>
.dropbtn {
  background-color: #d3d3d3;
  color: black;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin: 0;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
  width: 160px;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  cursor: pointer;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #f1f1f1}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: gray;
}
</style>