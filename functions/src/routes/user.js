const express = require("express");
const userSchema = require("../models/user");
const { generateToken, generateId } = require("../utilities/UserUtilites");

const router = express.Router();

// Middleware for parsing JSON bodies
router.use(express.json());

//User signup
router.post("/signUp/User", (req, res) => {
  const userData = req.body;
  const userToken = generateToken();
  const userId = generateId();

  const newUser = {
    userId: userId,
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    password: userData.password,
    token: userToken,
  };

  userSchema.findOne({ email: newUser.email }).then((existingUser) => {
    if (existingUser) {
      res.json({ message: "User already exists", data: null });
      return;
    }
    const newUserSchema = userSchema(newUser);
    newUserSchema
      .save()
      .then((data) => {
        res.json({ message: "User created", data: data });
      })
      .catch((err) => {
        res.json({ message: "Can't create the user", data: null });
      });
  });
});

//Update user
router.put("/user", (req, res) => {
  const userData = req.body;
  const newUserData = {
    name: userData.name,
    password: userData.password,
    phone: userData.phone,
  };
  const userId = req.params.userId;
  userSchema
    .updateOne({ userId: userId }, { $set: newUserData })
    .then(() => {
      res.json({ message: "User updated", data: newUserData });
    })
    .catch((err) => {
      res.json({ message: "Can't find the user", data: null });
    });
});

//User login
router.post("/logIn/User", (req, res) => {
  const email = req.body.email;
  const passWord = req.body.password;
  userSchema
    .findOne({ email: email })
    .then((user) => {
      if (!(user.email === email)) {
        res.json({ message: "Email incorrect", data: null });
        return;
      }
      if (!(user.password === passWord)) {
        res.json({ message: "Password is incorrect", data: null });
        return;
      }
      res.json({ message: "User found", data: user });
    }) 
    .catch((err) => {
      res.json({ message: "User not found", data: null });
    });
});

module.exports = router;
