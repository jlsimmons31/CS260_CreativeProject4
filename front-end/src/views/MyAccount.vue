<template>
<div class="wrapper">	
	<div v-if="loading" id="loadingDiv">
		<img src="images/loading.gif" width=100px height=100px />
		<p>Loading...</p>
	</div>
  <div v-else class="account-info">
    <h2><u>My Account</u></h2>
    <h3>Manage your personal information.</h3>
	<h5><i>Flights are tracked by name, so if you don't see your previous flights, make sure you've entered your name correctly</i></h5>
	<div class="additional-information">
		<input type="text" placeholder="First Name" v-model="currentCustomer.first">
		<input type="text" placeholder="Last Name" v-model="currentCustomer.last">
		<input type="text" placeholder="Email Address" v-model="currentCustomer.email">
		<input type="text" placeholder="Phone Number" v-model="currentCustomer.phone">
	</div>
    <button class="save-button" @click="updateCustomerInfo()">Save</button>
  </div>
  <h4 v-if="saved"><i>Your data has been saved.</i></h4>
</div>
</template>


<script>

var axios = require('axios');
export default {
  name: 'MyAccount',
  data() {
    return {
		currentCustomer: { },
		loading: false,
		saved: false,
    }
  },
  created() {
	this.currentCustomer = this.$root.$data.currentCustomer;
	if (!this.currentCustomer.first) { console.log("No first"); } // missing first name
	else if (this.currentCustomer.email || this.currentCustomer.phone) { console.log("Valid email or phone"); } // has valid email or phone
	// in all above cases, we would not fetch customer info.
	else {
		this.loading = true;
		let req = axios.get("/api/customer/" + this.currentCustomer.fullName());
		req.then((res) => {
			this.loading = false;
			this.currentCustomer = res.data;
			// res.data.first;
			// this.currentCustomer.first = res.data.first;
			// this.currentCustomer.last = res.data.last;
			// if
		});
		req.catch(() => {
			this.loading = false;
		});
	}
  },
  methods: {
	updateCustomerInfo() {
		this.$root.$data.currentCustomer = this.currentCustomer;
		this.loading = true;
		this.saved = false;
		let req = axios.put("/api/customer/" + this.currentCustomer.fullName(), this.currentCustomer);
		req.then((res) => {
			this.loading = false;
			this.saved = true;
			this.currentCustomer = res.data;
		});
		req.catch(() => {
			this.loading = false;
			this.saved = false;
		});
	}
}
}
</script>


<style scoped>
.wrapper {
	
	display: flex;
	flex-direction: column;
	align-items: center;
}

.account-info {
	width: 400px;
}

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
  align-items: center;
}

.additional-information input {
	width: 300px;
}

.save-button {
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