<template>
<div class="wrapper">
	<h2>My Flights</h2>
	<div class="my_flights_list" v-if="this.$root.$data.myFlights.length > 0">
		<div class="my_flight" v-for="flight in this.$root.$data.myFlights" :key="flight.id">
			<img id="my_flight_image" :src="'/images/flight_images/' + flight.image_id + '.jpg'">
			<div id="my_flight_detail">
				<p class="my_flight_city">{{flight.city}} - <span>{{flight.distance}} miles</span></p>
			</div>
		</div>
	</div>
	<div v-else>
		<!-- <h2>My Flights</h2> -->
		<h3>You have not purchased any flights.</h3>
	</div>
</div>
</template>

<script>	
var moment = require('moment');

export default {
    name: 'Cart',
    methods: {
		removeFromCart(product) {
			for (let i = 0; i < this.$root.$data.cart.length; i++) {
				if (this.$root.$data.cart[i].id == product.id) {
					this.$root.$data.cart.splice(i, 1);
					break;
				}
			}
		},		
		computeTimeFromNow(time) {
			let t = moment();
			t.add(time, 'hours');
			return t.format("ddd h:mmA");
		}
    }
  }
</script>


<style>

	.wrapper {
		text-align: center;
	}

	.my_flights_list {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		
	}

	.my_flight {
		background-color: #87ceeb;
		width:400px;
		margin: 8px;
	}

	.my_flight_city {
		font-size: 20px;
	}

	.price {
		text-align: right;
		padding: 8px;
		font-weight: 800;
		display: grid;
		margin-top: 32px;
	}

	button {
		height: 50px;
		background: #000;
		color: white;
		border: none;
		font-weight: 800;
		margin: 8px;
	}

	.my_flight p {
		margin: 0px;
		font-size: 14px;
	}

	#my_flight_image {
		height: 200px;
		width: 100%;
		border: 2px solid #333;
		object-fit: cover;
	}

	#my_flight_detail {
		margin-left: 8px;
	}

	#my_flight_price {
		display: flex;
		flex-direction: column;
		align-items: right;
	}

</style>