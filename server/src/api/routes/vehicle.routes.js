const express = require("express");
const router = express.Router();
const {
  getVehicleTypes,
  getVehicles,
} = require("../controllers/vehicle.controller");

router.get("/types", getVehicleTypes);
router.get("/", getVehicles);

module.exports = router;
