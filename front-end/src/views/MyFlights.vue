<template>
<div class="wrapper">
	<h2>My Flights</h2>
	<div class="my_flights_list" v-if="this.$root.$data.myFlights.length > 0">
		<div class="my_flight" v-for="flight in this.$root.$data.myFlights" :key="flight.id">
			<img id="my_flight_image" :src="'/images/flight_images/' + flight.image_id + '.jpg'">
			<div class="my_flight_info">
				<div id="my_flight_detail">
					<p id="my_flight_city">{{flight.city}} - <span>{{flight.distance}} miles</span></p>
					<p>{{flight.seatType}} (${{flightPrice(flight)}})</p>
					<p>Departing {{computeTimeFromNow(flight.time_to_takeoff)}}</p>
				</div>
			</div>
			<div class="my_flight_actions">
				<p class="linkBtn" @click="printTickets()">Print Boarding Pass</p>
				<p class="linkBtn" @click="cancelFlight(flight)">Cancel Flight</p>
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
var axios = require('axios');

export default {
    name: 'Cart',
	created() {
		getTickets();
	},

    methods: {
		async getTickets() {
			axios.get("/api/purchasedtickets/" + this.userName).then(res, => {
				this.$root.$data.myFlights = res.data;
			});
		},
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
		},
		flightPrice(flight) {
			return flight.pricePaid;
		},
		cancelFlight(flight) {
			if (confirm("Are you sure you want to cancel your purchase?"))
			{
				for (let i = 0; i < this.$root.$data.myFlights.length; i++) {
					if (this.$root.$data.myFlights[i].id == flight.id) {
						this.$root.$data.myFlights.splice(i, 1);
						break;
					}	
				}
			}
		},
		printTickets() {
			alert("Your boarding pass is not quite ready yet. Please check back soon");
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

	.my_flight_info {
		float: left;
		text-align: left;
	}

	.my_flight_actions {
		margin: 24px 12px 0 0;
		float: right;
		text-align: right;
	}

	.my_flight {
		background-color: #87ceeb;
		width:460px;
		margin: 8px;
		padding-bottom: 4px;
	}

	.linkBtn {
		text-decoration: underline;		
	}
	.linkBtn:hover {
		cursor: pointer;
	}

	p span {
		font-size: 16px;
	}

	.my_flight p {
		margin: 0px;
		font-size: 18px;
	}

	#my_flight_city {
		font-size: 22px;
	}

	button {
		height: 50px;
		background: #000;
		color: white;
		border: none;
		font-weight: 800;
		margin: 8px;
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