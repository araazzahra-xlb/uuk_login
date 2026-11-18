import "dotenv/config";
import { PrismaClient, Role } from "../src/generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const directUrl = process.env.DIRECT_URL;
if (!directUrl) {
  throw new Error("DIRECT_URL belum di-set di .env");
}

const adapter = new PrismaPg({ connectionString: directUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminPassword = await bcrypt.hash("Admin123!", 10);
  const customerPassword = await bcrypt.hash("Customer123!", 10);

  await prisma.user.upsert({
    where: { email: "admin@isp.test" },
    update: {},
    create: {
      name: "Administrator",
      email: "admin@isp.test",
      password: adminPassword,
      role: Role.ADMIN,
    },
  });

  await prisma.user.upsert({
    where: { email: "customer@isp.test" },
    update: {},
    create: {
      name: "Pelanggan Demo",
      email: "customer@isp.test",
      password: customerPassword,
      role: Role.CUSTOMER,
    },
  });

  if ((await prisma.serviceProvider.count()) === 0) {
    await prisma.serviceProvider.createMany({
      data: [
        {
          name: "Paket Rumah 20 Mbps",
          description: "Untuk 1-3 perangkat",
          speed: 20,
          price_per_month: 250000,
          is_active: true,
        },
        {
          name: "Paket Rumah 50 Mbps",
          description: "Untuk keluarga kecil",
          speed: 50,
          price_per_month: 350000,
          is_active: true,
        },
        {
          name: "Paket Bisnis 100 Mbps (nonaktif)",
          description: "Untuk uji status nonaktif",
          speed: 100,
          price_per_month: 600000,
          is_active: false,
        },
      ],
    });
  }

  console.log("Seed selesai");
  console.log("Admin: admin@isp.test / Admin123!");
  console.log("Customer: customer@isp.test / Customer123!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
