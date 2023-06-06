const express = require("express");
const offerSchema = require("../models/offers");
const { generateId } = require("../utilities/UserUtilites");
const router = express.Router();

// Middleware for parsing JSON bodies
router.use(express.json());

//Create offer
router.post("/offers", (req, res) => {
  const offerData = req.body;
  const offerId = generateId();

  const newOffer = {
    offerId: offerId,
    description: offerData.description,
    name: offerData.name,
    price: offerData.price,
    category: offerData.category,
    userName: offerData.userName,
    userId: offerData.userId,
    date: new Date(),
  };

  const newOfferSchema = offerSchema(newOffer);
  newOfferSchema
    .save()
    .then((data) => {
      res.json({ message: "Offer created", data: data });
    })
    .catch((err) => {
      res.json({ message: "Can't create the offer", data: null });
    });
});

//Get offers by category
router.post("/getAllOffers", (req, res) => {
  const category = req.body.category;
  if (!category || category === "All") {
    offerSchema
      .find()
      .then((newData) => {
        res.json({ message: "Offers found", data: newData });
      })
      .catch((err) => {
        res.json({ message: "Can't find the offers", data: null });
      });
    return;
  }
  //if user send category
  offerSchema.where("category", category).then((newData) => {
    res.json({ message: "Offers by category found", data: newData });
  });
});

//Get offers posted by user
router.post("/offers/user", (req, res) => {
  const body = req.body;
  const userId = body.userId;
  console.log(userId)
  offerSchema
    .find({ userId: userId })
    .then((data) => {
      res.json({ message: "Offers found", data: data });
    })
    .catch((err) => {
      res.json({ message: "Can't find the offers", data: null });
    });
});

module.exports = router;
