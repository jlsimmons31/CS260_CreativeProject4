const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
// 	next();
//   });

const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
	// Possibly save _id of person purchasing ticket?
	name: String,
	price: String,
	seatType: String,
	departure: String,
	city: String,
	distance: Number,
	image_id: String,
	time_to_takeoff: Number,
	first_class_price: Number,
	base_price: Number,
  });
const Ticket = mongoose.model('PurchasedTickets', ticketSchema);

const customerSchema = new mongoose.Schema({
	first: String,
	last: String,
	email: String,
	phone: String,
	full_name: String,
	
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
		if (notNullOrEmpty([req.body.name, req.body.city])) {
			let name1 = req.body.name;
			while (name1[name1.length - 1] == ' ')
				name1 = name1.substring(0, name1.length - 1);
			let t = new Ticket({
				name: name1,
				price: req.body.price,
				seatType: req.body.seatType,
				departure: req.body.departure,
				city: req.body.city,
				distance: req.body.distance,
				// duration_hrs: req.body.duration_hrs,
				image_id: req.body.image_id,
				time_to_takeoff: req.body.time_to_takeoff,
				first_class_price: req.body.first_class_price,
				base_price: req.body.base_price,
				
				// first_class_price: req.body.first_class_price,
				// base_price: req.body.base_price,
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

app.put("/api/updateticket/:id", async(req, res) => {
	try {
	let t = await Ticket.findById(req.params["id"]);
	t.price = req.body.price;
	t.seatType = req.body.seatType;
	await t.save();
	res.sendStatus(200);
	}
	catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

app.get("/api/purchasedtickets/:userName", async(req, res) => {
	try {
		let userName = req.params.userName;
		let tickets = await Ticket.find({ name: userName });
		if (tickets.length > 0) {
			res.send(tickets);
		}
		else {
			res.status(400).send("No tickets found for user: " + userName);
		}
		
	}
	catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});




//Customer info

app.get("/api/customer/:name", async(req, res) => {
	try {
		let cust_name = req.params.name;
		let c = (await Customer.find({ full_name: cust_name }))[0];
		if (c)
			res.send(c);
		else
			res.status(400).send("Could not find customer");
	}
	catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});
app.put("/api/customer/:name", async(req, res) => {
	try {
		if (req.body.first) {
			let cust_name = req.params.name;
			let c = (await Customer.find({ full_name: cust_name }))[0];
			if (c) {
				if (req.body.phone)
					c.phone = req.body.phone;
				if (req.body.email)
					c.email = req.body.email;
				await c.save();
				res.send(c);
			}
			else {
				let c = new Customer( {
					first: req.body.first,
					last: req.body.last,
					email: req.body.email,
					phone: req.body.phone,
					full_name: req.body.last ? req.body.first + " " + req.body.last : req.body.first,
				});
				await c.save();
				res.send(c);
			}
		}
		else {
			res.status(400).send("Missing first or last name");
		}
	}
	catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});

//

app.listen(3000, () => console.log("Sever running on port 3000..."));