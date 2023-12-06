import prisma from '../src/utils/db';
import { seedData } from '../data/seedData';

async function main() {
  for (let user of await seedData.users) {
    await prisma.user.create({
      data: user,
    });
  }
  for (let project of await seedData.projects) {
    await prisma.project.create({
      data: project,
    });
  }
  for (let task of await seedData.tasks) {
    await prisma.task.create({
      data: task,
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
