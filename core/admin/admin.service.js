import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class AdminService {
  constructor() { this.db = new PrismaClient() }

  async registration({ id, first_name, last_name, username }) {
    return this.db.admin.create({ data: { telegram_id: id, first_name, last_name, username } });
  }

  async isRegistered(id) {
    return !!(await this.#findAdminByTelegramId(id));
  }

  async auth(id, password) {
    const candidate = await this.#findAdminByTelegramId(id);
    if (candidate && candidate.password === password) {
      return candidate;
    }
    return null;
  }

  async #findAdminByTelegramId(id) {
    return this.db.admin.findUnique({ where: { telegram_id: id } });
  }
};

export const adminService = new AdminService(); 