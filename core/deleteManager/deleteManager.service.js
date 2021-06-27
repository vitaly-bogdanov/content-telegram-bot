import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class DeleteManagerService {
  constructor() { this.db = new PrismaClient() }

  async unconfirmedByTelegramId(telegram_id) {
    return await this.db.manager.update({ where: { telegram_id }, data: { confirmed: false } });
  }

  async isManagerRegistered(telegram_id) {
    return !!(await this.#findManagerByTelegramId(telegram_id));
  }

  async #findManagerByTelegramId(telegram_id) {
    return await this.db.manager.findUnique({ where: { telegram_id } })
  }

};

export const deleteManagerService = new DeleteManagerService(); 