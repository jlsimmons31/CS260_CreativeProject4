<template>
<div class="wrapper">
	<h2>My Flights</h2>
	<div v-if="loading" id="loadingDiv">
		<img src="images/loading.gif" width=100px height=100px />
		<p>Loading flights...</p>
	</div>
	<div class="my_flights_list" v-else-if="this.$root.$data.myFlights.length > 0">
		<div class="my_flight" v-for="flight in this.$root.$data.myFlights" :key="flight.id">
			<img id="my_flight_image" :src="'/images/flight_images/' + flight.image_id + '.jpg'">
			<div class="my_flight_info">
				<div id="my_flight_detail"> 
					<p id="my_flight_city">{{flight.city}} - <span>{{flight.distance}} miles</span></p>
					<p>{{flight.seatType}} (${{flight.price}})</p>
					<p>Departing {{computeTimeFromNow(flight.time_to_takeoff)}}</p>
				</div>
			</div>
			<div class="my_flight_actions">
				<p v-if="flight.seatType === 'Economy'" class="linkBtn" @click="changeToFirstClass(flight)">Change Seat to First Class</p>
				<p v-else class="linkBtn" @click="changeToEconomy(flight)">Change Seat to Economy</p>
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
	name: 'MyFlights',
	data() {
		return { 
			loading: false
		};
	},
	created() {
		this.loading = true;
		let req = axios.get("/api/purchasedtickets/" + this.$root.$data.currentCustomer.fullName());
		req.then((res) => {
			this.loading = false;
			this.$root.$data.myFlights = res.data;
		});
		req.catch(() => {
			this.loading = false;
		});
	},
    methods: {	
		changeToEconomy(flight) {
			let newPrice = flight.base_price;
			let newSeatType = "Economy";

			let body = { price: newPrice, seatType: newSeatType };
			axios.put("/api/updateticket/" + flight._id, body).then(res => {
				flight.price = res.data.price;
				flight.seatType = res.data.seatType;
			});
		},
		changeToFirstClass(flight) {
			let newPrice = flight.first_class_price;
			let newSeatType = "First Class";

			let body = { price: newPrice, seatType: newSeatType };
			axios.put("/api/updateticket/" + flight._id, body).then(res => {
				flight.price = res.data.price;
				flight.seatType = res.data.seatType;
			});
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
			if (confirm("Are you sure you want to cancel your purchase?")) {
				try {
					axios.delete("/api/cancelticket/" + flight._id);
					axios.get("/api/purchasedtickets/" + this.$root.$data.username).then((res) => {
						this.$root.$data.myFlights = res.data;
					});
					return true;
				} 
				catch (error) {
					console.log(error);
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

	#loadingDiv {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

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