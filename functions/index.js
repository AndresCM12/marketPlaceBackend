const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { onRequest } = require("firebase-functions/v1/https");

//Routes
const userRoutes = require("./src/routes/user.js");
const offerRoutes = require("./src/routes/offers.js");

//App
const app = express();
const uri =
  "mongodb+srv://aanresmark2:XKcl4Ej7fJpc6kVx@lapoderosa.ofvj8w6.mongodb.net/?retryWrites=true&w=majority";
app.use(cors());

//middleware
app.use(express.json());
app.use("/api/", userRoutes);
app.use("/api/", offerRoutes);

//routes
app.get("/", (req, res) => res.send("Hello World!"));

//mogoDB connection
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

exports.widgets = onRequest(app);