const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        vehicle: {
          include: {
            vehicleType: true,
          },
        },
      },
    });
    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

const createBooking = async (req, res) => {
  const { vehicleId, startDate, endDate, firstName, lastName } = req.body;

  if (!vehicleId || !startDate || !endDate || !firstName || !lastName) {
    return res.status(400).json({ error: "Missing required booking fields." });
  }

  try {
    const existing = await prisma.booking.findFirst({
      where: {
        vehicleId: Number(vehicleId),
        OR: [
          {
            startDate: { lte: new Date(endDate) },
            endDate: { gte: new Date(startDate) },
          },
        ],
      },
    });

    if (existing) {
      return res
        .status(409)
        .json({ error: "Vehicle is already booked for selected dates." });
    }

    const booking = await prisma.booking.create({
      data: {
        vehicleId: Number(vehicleId),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        firstName,
        lastName,
      },
    });

    res.json(booking);
  } catch (err) {
    console.error("Booking failed:", err);
    res.status(500).json({ error: "Failed to create booking" });
  }
};

const deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await prisma.booking.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(booking);
  } catch (err) {
    console.error(`Error deleting booking ${id}:`, err);
    res.status(500).json({ error: `Failed to delete booking ${id}` });
  }
};

module.exports = {
  getBookings,
  createBooking,
  deleteBooking,
};
