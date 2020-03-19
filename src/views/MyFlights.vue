<template>
<div class="wrapper">
	<div class="my_flights_list" v-if="this.$root.$data.myFlights.length > 0">
		<h2>My Flights</h2>
		<div v-for="flight in this.$root.$data.myFlights" :key="flight.id">
			<div class="my_flight">
				<img id="my_flight_image" :src="'/images/flight_images/' + flight.image_id + '.jpg'">
				<div id="my_flight_detail">
					<h1>{{flight.city}}</h1>
					<p>{{flight.distance}} miles</p>
				</div>
			</div>
		</div>
	</div>
	<div v-else>
		<h2>My Flights</h2>
		<h3>You have not purchased any flights.</h3>
	</div>
</div>
</template>

<script>	
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
		}
    }
  }
</script>


<style>
	.wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.my_flight {
		margin: 0 10% 24px 10%;
		display: grid;
		grid-template-columns: 1fr 3fr 2fr;
		grid-column-gap: 5px;
		grid-template-areas: "cart_product_image cart_product_detail cart_product_price";
		background: #F2921D;
	}

	.my_flight h1 {
		font-size: 24px;
	}

	.my_flight h2 {
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
		height: 160px;	
		width: 240px;
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