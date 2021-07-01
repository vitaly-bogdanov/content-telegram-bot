import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class TimeService {
  constructor() { this.db = new PrismaClient() }

  async updateTimeById(id, value) {
    return await this.db.time.update({ where: { id: +id }, data: { value } });
  }

}

export const timeService = new TimeService();