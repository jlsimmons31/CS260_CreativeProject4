<template>
<div>
  <p>You want to purchase a flight to {{this.$root.$data.currentFlightBeingPurchased.city}}!</p>
</div>
</template>


<script>
// import ProductList from "../components/ProductList.vue"
export default {
  name: 'BuyFlight',
  components: {
    // ProductList
  },
  data() {
    return {
      country: '',
    }
  },
  computed: {
    
  },
  methods: {
    
  }
}
</script>

