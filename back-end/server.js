const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
	name: String,
	price: Number,
  });
const Ticket = mongoose.model('Ticket', ticketSchema);

mongoose.connect('mongodb://localhost:27017/corona-airlines', {
  useNewUrlParser: true
});

app.get("/api/tickets", async(req, res) => {
	try {
		// 
	}
	catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
});




app.listen(3000, () => console.log("Sever running on port 3000..."));