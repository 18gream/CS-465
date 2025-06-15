const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");

// GET all trips
router.route("/trips").get(tripsController.tripsList);

// POST a new trip
router.route("/trips").post(tripsController.tripsAddTrip);

// GET trip by code
router.route("/trips/:tripCode").get(tripsController.tripsFindByCode);

//UPDATE trip
router.route('/trips/:tripCode').put(tripsController.tripsUpdateTrip);


module.exports = router;
