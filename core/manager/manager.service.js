import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class ManagerService {
  constructor() { this.db = new PrismaClient() }

  async registration({ id, first_name, last_name, username }) {
    return this.db.manager.create({ data: { telegram_id: id, first_name, last_name, username } });
  }
}

export const managerService = new ManagerService();