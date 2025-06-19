const express = require("express");
const router = express.Router();
const { expressjwt } = require("express-jwt");
const jwt = require('jsonwebtoken');

const authenticateJWT = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload"
});

console.log("JWT_SECRET =", process.env.JWT_SECRET);

const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");


router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

router
  .route("/trips")
  .get(tripsController.tripsList)
  .post(authenticateJWT, tripsController.tripsAddTrip);

router
  .route("/trips/:tripCode")
  .get(tripsController.tripsFindByCode)
  .put(authenticateJWT, tripsController.tripsUpdateTrip);

// define route for login endpoint 
router 
.route('/login') 
.post(authController.login); 

console.log("authController.register:", typeof authController.register);
console.log("authController.login:", typeof authController.login);
console.log("tripsController.tripsList:", typeof tripsController.tripsList);
console.log("tripsController.tripsAddTrip:", typeof tripsController.tripsAddTrip);
console.log("tripsController.tripsFindByCode:", typeof tripsController.tripsFindByCode);
console.log("tripsController.tripsUpdateTrip:", typeof tripsController.tripsUpdateTrip);


module.exports = router;
