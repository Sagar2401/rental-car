const express = require("express");
const router = express.Router();

const vehicleRoutes = require("./vehicle.routes");
const bookingRoutes = require("./booking.routes");

router.use("/vehicles", vehicleRoutes);
router.use("/bookings", bookingRoutes);

module.exports = router;
