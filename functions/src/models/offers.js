const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  id: String,
  description: String,
  name: String,
  price: Number,
  category: String,
  userName: String,
  userId: String,
  date: String,
});

const Offer = mongoose.model("Offer", offerSchema);
module.exports = Offer;
