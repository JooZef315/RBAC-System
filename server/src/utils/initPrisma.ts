import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

if (!globalForPrisma.prisma) {
  console.log("new PrismaClient created!");
  globalForPrisma.prisma = new PrismaClient();
}

export const prisma = globalForPrisma.prisma;
