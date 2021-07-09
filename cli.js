import Prisma from '@prisma/client';

import { getHashHelper } from './lib/bcrypt/index.js';

const { PrismaClient } = Prisma;
const prisma = new PrismaClient();
async function start() {
  const passwordIndex = process.argv.indexOf('--password');
  const idIndex = process.argv.indexOf('--id');
  switch (process.argv[2]) {
    case 'set-admin-password':
      if (passwordIndex === -1) throw Error('Не указан password');
      if (idIndex === -1) throw Error('Не указан id, для которого нужно создать пароль');
      const password = getHashHelper(process.argv[passwordIndex+1]);
      const telegram_id = +process.argv[idIndex+1];
      await prisma.admin.update({ where: { telegram_id }, data: { password } });
      break;
      
    //...
    default:
      throw Error('Command error')
  }
};



start().catch(e => {
  throw e;
}).finally(async () => {
  await prisma.$disconnect();
});