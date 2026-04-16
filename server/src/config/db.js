import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Warm up connection on startup
async function connectWithRetry(retries = 3, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      await prisma.$connect();
      console.log("Database connected");
      return;
    } catch (err) {
      console.log(`⏳ DB not ready, retrying (${i + 1}/${retries})...`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  console.error("Could not connect to database after retries");
}

connectWithRetry();


export default prisma;
