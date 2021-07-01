import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class SelectCategoryService {
  constructor() { this.db = new PrismaClient() }

  async getTimesWhitCategoryByScheduleId(scheduleId) {
    return this.db.time.findMany({ where: { scheduleId: +scheduleId }, include: { category: true } });
  }
}

export const selectCategoryService = new SelectCategoryService();