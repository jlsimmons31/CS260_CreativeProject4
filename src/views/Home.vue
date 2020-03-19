<template>
<div class="page">
  <div class="search_content">
    <div class="search_input">
        <div class="buttons">
          <div class="from-button">
            <h4 class="form-text">Fly From: </h4>
              <form class="from-city" v-on:submit.prevent>
              <div class="dropdown">
                <button class="dropbtn">{{startingCity}}</button>
                <div class="dropdown-content">
                  <a @click="startingCity = 'Salt Lake'">Salt Lake</a>
                  <a @click="startingCity = 'Denver'">Denver</a>
                  <a @click="startingCity = 'Las Vegas'">Las Vegas</a>
                </div>
              </div>
            </form>
          </div>
          <div class="to-button"> 
            <h4 class="form-text">Fly To:</h4>
              <input placeholder=" Search a City" type="text" id="destinationCitySearch" v-model="citySearch" autocomplete="off">
              <br /><br />
            </div>
          </div>
        </div>
        <div class="search_output">
          <h3 class="page-text">Your paradise is just a few clicks away!</h3>
          <div v-show="filteredResults.length === 0">
            <p v-if="this.citySearch.length > 0">No results found. Try another city.</p>
            <p v-else>Begin typing a destination city to see available flights.</p>
          </div>
          <div v-for="flight in filteredResults" :key="flight.id">
            <router-link to="/BuyFlight">
              <div class="flight_result" @click="selectDestination(flight)">
                <img :src="'/images/flight_images/' + flight.image_id + '.jpg'" >
                <div>
                  <p class="flight_city"> <strong>{{flight.city}}</strong></p>
                  <p class="flight_details">
                    <strong>Distance: </strong> {{flight.distance}} miles<br />
                    <strong>Economy: </strong> ${{flightPrice(flight.base_price)}}<br />
                    <strong>First Class: </strong> ${{flightPrice(flight.first_class_price)}}<br />
                    <small><i>Departs {{computeTimeFromNow(flight.time_to_takeoff)}}</i></small>
                  </p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      <!-- <ProductList v-if="startingCity === ''" :flights="flights" />   -->
    </div>
</div>
</template>


<script>
  // import ProductList from "../components/ProductList.vue"
  //import moment from 'moment'
  var moment = require('moment');

  export default {
    name: 'Home',
    components: {
      // ProductList,
    },
    data() {
      return {
        startingCity: 'Salt Lake',
        endingCity: "",
        citySearch: "",
        priceFactor: 1.1,
        moment: require('moment')
      }
    },
    computed: {
      toCity() {
        return this.$root.$data.flights.city.filter(cityName => cityName.city.toLowerCase().search(this.endingCity.toLowerCase()) >= 0);
      },
      flights() {
        return this.$root.$data.flights; //filter this later
      },
      filteredResults() { 
        if (this.citySearch === '')
          return [ ];
        else
          return this.$root.$data.flights.filter(cityName => cityName.city.toLowerCase().search(this.citySearch.toLowerCase()) >= 0)
          .slice(0, 5);
      },
    },
    methods: {
      flightPrice(seatPrice) {
        seatPrice *= this.priceFactor;
        return seatPrice.toFixed(2);
      },
      selectDestination(flight) {
<<<<<<< HEAD
      //to make sure there is only one flight being purchased
      if (this.$root.$data.currentFlightBeingPurchased.length > 0){
        this.$root.$data.currentFlightBeingPurchased.splice(0, 1);
      }
      flight.base_price *= this.priceFactor;
      flight.first_class_price *= this.priceFactor;
      this.$root.$data.currentFlightBeingPurchased.push(flight);
      this.$root.$data.startingCity = this.startingCity;
      },
=======
        //to make sure there is only one flight being purchased
        if (this.$root.$data.currentFlightBeingPurchased.length > 0){
          this.$root.$data.currentFlightBeingPurchased.splice(0, 1);
        }
        flight.base_price *= this.priceFactor;
        flight.first_class_price *= this.priceFactor;
        this.$root.$data.currentFlightBeingPurchased.push(flight);
      },      
      computeTimeFromNow(time) {
        let t = moment();
        t.add(time, 'hours');
        return t.format("ddd h:mmA");
      }
>>>>>>> 4b79f89726b60c5b41a63dfa85b0b9b89a3ead06
    },
    watch: {
      startingCity: function price() {
        if (this.startingCity === "Salt Lake") {
          this.priceFactor = 1.1;
        }
        if (this.startingCity === "Denver") {
          this.priceFactor = 1;
        }
        if (this.startingCity === "Las Vegas") {
          this.priceFactor = 1.2;
        }
      }
    }
  }
</script>

<style scoped>

.search_output a {
  text-decoration: none!important;
}

#destinationCitySearch {
  height: 48px;
  font-size: 18px;
  font-weight: 550;
}
.flight_result {
  display: flex;
  padding: 8px;
}
.flight_result:hover {
  background-color: lightgray;
  cursor: pointer;
}
.flight_result img {
  width: 220px;
  height: 128px;
  object-fit: cover;
  margin-right: 8px;
}
.flight_city {
  margin:0 0 16px 0;
  font-size: 20px;
  color: black;
}
.flight_details {
  margin:0;
  font-size: 18px;
  color: black;
}

.search_content {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.search_input {
  margin-right: 48px;

}
.search_output {

}

.flightSearchResult {
  color: blue;
  text-decoration: underline;
}

.buttons {
  display: flex;
}
.page-text {
  display: flex;
}
.form-text {
/* margin-bottom: -10px; */
}
.from-button {
display: flex;
flex-direction: column;
align-items: flex-start;
}

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
