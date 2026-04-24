// prisma/seed.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
async function main() {
  const categories = [
    { id: 1, name: 'Tech' },
    { id: 2, name: 'Clothes' },
    { id: 3, name: 'Food' },
  ];

  for (const data of categories) {
    const category = await prisma.category.upsert({
      where: { id: data.id }, // ahora sí, id es único
      update: {},
      create: data,
    });
   
  }
}
main()
  .catch((e) => {
    console.error(' Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    console.log(' Desconectando Prisma');
    await prisma.$disconnect();
  });