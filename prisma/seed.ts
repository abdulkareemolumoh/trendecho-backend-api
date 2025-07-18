import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
