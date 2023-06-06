const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const functions = require("firebase-functions");

//Routes
const userRoutes = require("./routes/User");
const offerRoutes = require("./routes/offers");

//App
const app = express();
const port = 3000;
const uri =
  "mongodb+srv://aanresmark2:XKcl4Ej7fJpc6kVx@lapoderosa.ofvj8w6.mongodb.net/?retryWrites=true&w=majority";
app.use(
  cors({
    origin: "*",
  })
);

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

app.listen(port, () => console.log("⚡ Server started"));

exports.app = functions.https.onRequest(app);