const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.vehicleType.deleteMany();

  // Create vehicle types
  const carType = await prisma.vehicleType.create({
    data: { name: "Car", wheels: 4 },
  });
  const bikeType = await prisma.vehicleType.create({
    data: { name: "Bike", wheels: 2 },
  });

  // Car data
  const cars = [
    "Maruti Suzuki Swift",
    "Hyundai Creta",
    "Tata Nexon",
    "Honda City",
    "Kia Seltos",
  ];

  // Bike data
  const bikes = [
    "Royal Enfield Classic 350",
    "KTM Duke 200",
    "Yamaha R15 V4",
    "Bajaj Pulsar NS200",
    "TVS Apache RTR 160 4V",
  ];

  // Create cars
  for (const carName of cars) {
    await prisma.vehicle.create({
      data: {
        name: carName,
        typeId: carType.id,
      },
    });
  }

  // Create bikes
  for (const bikeName of bikes) {
    await prisma.vehicle.create({
      data: {
        name: bikeName,
        typeId: bikeType.id,
      },
    });
  }

  console.log("🌱 Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
