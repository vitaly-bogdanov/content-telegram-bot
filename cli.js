import Prisma from '@prisma/client';
import { start } from 'repl';

const { PrismaClient } = Prisma;

async function start() {
  const prisma = new PrismaClient();
  switch (process.argv[2]) {
    case 'create-user':

      console.log(process.argv[2]);
      // const passwordIndex = process.argv.indexOf('--password');
      // const idIndex = process.argv.indexOf('--id');
      // if (passwordIndex === -1) throw Error('Не указан password');
      // if (idIndex === -1) throw Error('Не указан id');
      // const password = process.argv[passwordIndex+1];
      // const telegram_id = process.argv[idIndex+1];
      // await prisma.admin.update({
      //   where: { telegram_id },
      //   data: { password } 
      // });
      break;
    case 'reset-admin':

      break;
    default:
      throw Error('Command error')
  }
};

start().catch(e => {
  throw e
}).finally(async () => {
  await prisma.$disconnect()
});