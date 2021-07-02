import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class ManagerService {
  constructor() { this.db = new PrismaClient() }

  async registration({ id, first_name, last_name, username }) {
    return this.db.manager.create({ data: { telegram_id: id, first_name, last_name, username } });
  }

  async isRegistered(telegram_id) {
    return !!(await this.#findManagerByTelegramId(telegram_id));
  }

  async #findManagerByTelegramId(telegram_id) {
    return this.db.manager.findUnique({ where: { telegram_id } }); 
  }

  async getMeWhithAllContent(telegram_id) {
    return this.db.manager.findUnique({ where: { telegram_id }, include: { contents: { include: { content: true } } } });
  }
  
}

export const managerService = new ManagerService();