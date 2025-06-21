const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getVehicleTypes = async (req, res) => {
  const wheels = parseInt(req.query.wheels);

  if (!wheels || (wheels !== 2 && wheels !== 4)) {
    return res
      .status(400)
      .json({ error: "Invalid wheels query param (2 or 4 expected)." });
  }

  try {
    const types = await prisma.vehicleType.findMany({
      where: { wheels },
    });
    res.json(types);
  } catch (err) {
    console.error("Error fetching vehicle types:", err);
    res.status(500).json({ error: "Failed to fetch vehicle types" });
  }
};

const getVehicles = async (req, res) => {
  const typeId = parseInt(req.query.typeId);

  if (!typeId) {
    return res.status(400).json({ error: "Missing typeId query param." });
  }

  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { typeId },
    });
    res.json(vehicles);
  } catch (err) {
    console.error("Error fetching vehicles:", err);
    res.status(500).json({ error: "Failed to fetch vehicles" });
  }
};

module.exports = {
  getVehicleTypes,
  getVehicles,
};
