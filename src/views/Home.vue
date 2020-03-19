<template>
<div class="page">
  <div class="search_content">
    <div class="search_input">
        <div class="buttons">
          <div class="from-button">
            <h4 class="form-text">Fly From: </h4>
              <form class="from-city">
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
              <!-- <input class="dropbtn" v-model="endingCity">
              <div class="dropdown-content" v-for="flight in this.$root.$data.flights" :key="flight.id">
              <a> {{this.$root.$data.flight.city}}</a>
              </div> -->
              <input type="text" id="destinationCitySearch" v-model="citySearch" autocomplete="off">
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
                  <p class="flight_city">{{flight.city}}</p>
                  <p class="flight_details">
                    Distance: {{flight.distance}} miles<br />
                    Economy: ${{flight.base_price}}<br />
                    First Class: ${{flight.first_class_price}}<br /> <!--ADD PRICE FACTORING-->
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
      selectDestination(flight) {
        this.$root.$data.currentFlightBeingPurchased = flight;
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
  width: 180px;
  height: 100px;
  object-fit: cover;
  margin-right: 8px;
}
.flight_city {
  margin:0 0 16px 0;
  font-size: 20px;
}
.flight_details {
  margin:0;
  font-size: 18px;
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
