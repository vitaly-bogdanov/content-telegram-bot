import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class AddManagerService {
  constructor() { this.db = new PrismaClient() }

  async confirmedByTelegramId(telegram_id) {
    return await this.db.manager.update({ where: { telegram_id }, data: { confirmed: true } });
  }

  async isManagerRegistered(telegram_id) {
    return !!(await this.#findManagerByTelegramId(telegram_id));
  }

  async #findManagerByTelegramId(telegram_id) {
    return await this.db.manager.findUnique({ where: { telegram_id } })
  }

};

export const addManagerService = new AddManagerService();