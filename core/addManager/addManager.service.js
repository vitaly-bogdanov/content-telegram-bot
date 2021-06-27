import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class AddManagerService {
  constructor() { this.db = new PrismaClient() }

  async confirmedByTelegramId(telegram_id) {
    return await this.#updateManagerByTelegramId(telegram_id);
  }

  async #updateManagerByTelegramId(telegram_id) {
    return await this.db.manager.update({ where: { telegram_id }, data: { confirmed: true } });
  }

};

export const addManagerService = new AddManagerService();