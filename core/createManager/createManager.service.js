import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class CreateManagerService {
  constructor() { this.db = new PrismaClient() }

  async add(telegram_id) {
    return await this.#updateManagerByTelegramId(telegram_id);
  }

  async #updateManagerByTelegramId(telegram_id) {
    return this.db.manager.update({ where: { telegram_id }, data: { confirmed: true } });
  }

};

export const createManagerService = new CreateManagerService();