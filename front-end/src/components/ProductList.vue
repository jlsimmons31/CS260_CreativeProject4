<template>
<div class="wrapper">
  <div class="products">
    <div class="product" v-for="flight in flights" :key="flight.id">
      <div class="info">
        <h1>{{flight.city}}</h1>
        <p>{{flight.distance}} miles away</p>
      </div>
      <div class="image">
        <img :src="'/images/flight_images/'+flight.image_id+'.jpg'">
      </div>
      <div class="price">
        <h2>${{flight.base_price}}</h2>
        <button @click="addToCart(flight)" class="auto">Add to Cart</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ProductList',
  props: {
    flights: Array
  },
  methods: {
    addToCart(product) {
      this.$root.$data.cart.push(product);
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.products {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.product {
  margin: 10px;
  margin-top: 50px;
  width: 400;
}

.product img {
  border: 2px solid #333;
  height: 250px;
  width: 400px;
  object-fit: cover;
}

.product .image {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.info {
  background: #F2921D;
  color: #000;
  padding: 10px 30px;
  height: 80px;
}

.info h1 {
  font-size: 16px;
}

.info h2 {
  font-size: 14px;
}

.info p {
  margin: 0px;
  font-size: 10px;
}


.price {
  display: flex;
}

button {
  height: 50px;
  background: #000;
  color: white;
  border: none;
}

.auto {
  margin-left: auto;
}
</style>