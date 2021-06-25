import Prisma from '@prisma/client';

import { isHashComparedHelper } from '../../lib/bcrypt/index.js';
import {
  setAuthAdminCacheHelper
} from '../../lib/cache/index.js';

const { PrismaClient } = Prisma;

class AdminService {
  constructor() { this.db = new PrismaClient() }

  async registration({ id, first_name, last_name, username }) {
    return this.db.admin.create({ data: { telegram_id: id, first_name, last_name, username } });
  }

  async isRegistered(id) {
    return !!(await this.#findAdminByTelegramId(id));
  }

  async login(id, password) {
    const candidate = await this.#findAdminByTelegramId(id);
    if (candidate && isHashComparedHelper(password, candidate.password)) { 
      setAuthAdminCacheHelper(id, { auth: true, ...candidate });
    }
    return candidate;
  }

  async #findAdminByTelegramId(telegram_id) {
    return this.db.admin.findUnique({ where: { telegram_id } });
  }

};

export const adminService = new AdminService(); 