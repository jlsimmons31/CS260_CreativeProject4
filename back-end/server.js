const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
  });

const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
	// Possibly save _id of person purchasing ticket?
	name: String,
	price: Number,
	seatType: String,
	departure: String,
	destination: String,
	time_of_departure: Date
  });
const Ticket = mongoose.model('PurchasedTickets', ticketSchema);

const customerSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,

	// To-Do: Add whatever other customer information
  });
const Customer = mongoose.model('Customers', customerSchema);

mongoose.connect('mongodb://localhost:27017/corona-airlines', {
  useNewUrlParser: true
});

function notNullOrEmpty(strs) {
	let fail = false;
	strs.forEach(str => { if (!str) { fail = true; } });
	return !fail;
  }

app.post("/api/purchaseticket", async(req, res) => {
	try {
		if (notNullOrEmpty([req.body.name, req.body.price, req.body.departure, req.body.destination])) {
			let t = new Ticket({
				name: req.body.name,
				price: req.body.price,
				seatType: req.body.seatType,
				departure: req.body.departure,
				destination: req.body.destination,
				time_of_departure: req.body.time_of_departure
			});
			await t.save();
			res.sendStatus(200);
		}
		else {
			//Missing required information
			res.status(400).send("Missing required info. Try again");
		}
	}
	catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

app.delete("/api/cancelticket/:id", async(req, res) => {
	try {
		let t = await Ticket.findById(req.params["id"]);
		await t.delete();
		res.sendStatus(200);
	}
	catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

app.put("/api/updateticket", async(req, res) => {

});

app.get("/api/purchasedtickets", async(req, res) => {
	
});




app.listen(3000, () => console.log("Sever running on port 3000..."));