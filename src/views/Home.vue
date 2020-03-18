<template>
<div class="page">
<h3 class="page-text">Your paradise is just a few clicks away!</h3>
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
    <h4 class="form-text">Fly To: </h4>
      <form>
        <input class="dropbtn" v-model="endingCity">
        <div class="dropdown-content" v-for"flight in this.$root.$data.flights" :key="flight.id">
        <a> {{this.$root.$data.flight.city}}</a>
        </div>
      </form>
    </div>
  </div>
  <ProductList v-if="startingCity === ''" :flights="flights" />
</div>
</template>


<script>
  import ProductList from "../components/ProductList.vue"
  export default {
    name: 'Home',
    components: {
      ProductList
    },
    data() {
      return {
        startingCity: 'Salt Lake',
        endingCity: "",
      }
    },
    computed: {
      toCity() {
        return this.$root.$data.flights.city.filter(cityName => cityName.city.toLowerCase().search(this.endingCity.toLowerCase()) >= 0);
      },
      flights() {
        return this.$root.$data.flights; //filter this later
      }
    },
  }
</script>

<style scoped>
.buttons {
  display: flex;
}
.page-text {
  display: flex;
}

form {
display: flex;
padding: 10px;
}
.form-text {
margin-bottom: -10px;
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
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
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
