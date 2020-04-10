<template>
<div>
  <div v-if="purchaseInProcess && !purchaseComplete">
    <img src="images/loading.gif" width=100px height=100px />
    <p></p>
  </div>
  <div v-else-if="purchaseError != ''">
    <p>Error while purchasing flight: {{purchaseError}}</p>
    <router-link to="/">Please Try Again</router-link>
  </div>
  <div v-else-if="purchaseComplete">
    <p>Your purchase has been completed.</p>
    <router-link to="/">Purchase Another Flight</router-link><br />
    <router-link to="/myflights">See My Flights</router-link>
  </div>
  <div v-else-if="this.$root.$data.currentFlightBeingPurchased.length > 0">
    <div class="flightDetails">
        <h2><u>Flight details</u></h2>
        <p><strong>Flight From: </strong>{{this.$root.$data.startingCity}}</p>
        <p><strong>Flight To: </strong>{{this.$root.$data.currentFlightBeingPurchased[0].city}}</p>
        <p> <strong>Departs at: </strong>{{computeTimeFromNow(this.$root.$data.currentFlightBeingPurchased[0].time_to_takeoff)}}</p>
        <p><strong>Ticket Price: </strong>${{price()}}</p>
        <div class="seat-type">
          <p class="seat-type-text"><strong>Seat Type: </strong></p>
          <div class="dropdown">
            <button class="dropbtn">{{seatType}}</button>
            <div class="dropdown-content">
              <a @click=" seatType= 'Economy'">Economy</a>
              <a @click=" seatType= 'First Class'">First Class</a>
            </div>
          </div>
        </div>
        <br/>
    </div>
    <h2><u>Personal Information</u></h2>
    <h3>Before purchasing your flight to {{this.$root.$data.currentFlightBeingPurchased[0].city}} we need just a bit more information about you.</h3>
    <form>
      <div class="additional-information">
        <input type="text" placeholder="First Name" v-model="currentCustomer.first">
        <input type="text" placeholder="Last Name" v-model="currentCustomer.last">
        <input type="text" placeholder="Email Address" v-model="currentCustomer.email">
        <input type="text" placeholder="Phone Number" v-model="currentCustomer.phone">
      </div>
    </form>
    <button class="purchase-button" @click.prevent="addFlight">Purchase Flight</button>
    <!-- <router-link to="/myflights">
          <button class="purchase-button" @click="addFlight">Purchase Flight</button>
        </router-link> -->
  </div>
  <div v-else>
    <p>Looks like you didn't select a destination. Go back to the home page and select a destination.</p>
  </div>
</div>
</template>


<script>
var moment = require('moment');
var axios = require('axios');
export default {
  name: 'BuyFlight',
  data() {
    return {
      firstName: "",
      seatType: "Economy",
      purchaseInProcess: false,
      purchaseComplete: false,
      purchaseError: "",      
      currentCustomer: { }

    }
  },
  computed: {
    
  },
  created() {
    this.currentCustomer = this.$root.$data.currentCustomer;
  },
  methods: {
    addFlight() {
      let currFlight = this.$root.$data.currentFlightBeingPurchased[0];

      currFlight.seatType = this.seatType;
      currFlight.pricePaid = this.price();
      // this.$root.$data.myFlights.push(currFlight);
      // if (this.firstName !== ""){
      //   this.$root.$data.username = this.firstName;
      // }
      //
      this.$root.$data.currentCustomer = this.currentCustomer;
      let customerName = this.currentCustomer.fullName();
      let ticketBody = {
        name: customerName,
				price: this.price(),
				seatType: this.seatType,
        departure: this.$root.$data.startingCity, 
        city: currFlight.city,
				distance: currFlight.distance,
				// duration_hrs: currFlight.duration_hrs,
				image_id: currFlight.image_id,
				time_to_takeoff: currFlight.time_to_takeoff,
      };
      
      axios.post("/api/purchaseticket", ticketBody).then((res) => {
        this.purchaseInProcess = false;
        if (res.status == 200) {
          this.purchaseComplete = true;
          this.$root.$data.currentFlightBeingPurchased.length = 0;
          // purchaseError = "";
        }
        else {
          this.purchaseError = res.data;
        }
      });

      
    },
		computeTimeFromNow(time) {
			let t = moment();
			t.add(time, 'hours');
			return t.format("ddd h:mmA");
    },
    price() {
      if (this.seatType === "Economy")
        return this.$root.$data.currentFlightBeingPurchased[0].base_price.toFixed(2);
      else
        return this.$root.$data.currentFlightBeingPurchased[0].first_class_price.toFixed(2);
      } 
  },
}
</script>


<style scoped>
.seat-type {
display: flex;
}

input {
  width: 20%;
  margin: 10px 0px 10px 0px;
}
.seat-type-text {
  margin-right: 10px;
  margin-top: 5px;
  margin-bottom: 0;
}

.additional-information {
  display: flex;
  flex-direction: column;
}

.purchase-button {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  background-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.16, rgb(207, 207, 207)), color-stop(0.79, rgb(252, 252, 252)));
  background-image: -moz-linear-gradient(center bottom, rgb(207, 207, 207) 16%, rgb(252, 252, 252) 79%);
  background-image: linear-gradient(to top, rgb(207, 207, 207) 16%, rgb(252, 252, 252) 79%); 
  padding: 3px;
  border: 1px solid #000;
  color: black;
  text-decoration: none;
  width: 120px;
  height: 30px;
  font-size: 12px;
  margin-left: 0px;
}

.dropbtn {
  background-color: #d3d3d3;
  color: black;
  margin: 0;
  font-size: 12px;
  border: none;
  cursor: pointer;
  height: 30px;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
  width: 120px;
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