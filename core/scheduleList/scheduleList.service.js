import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class ScheduleListService {
  constructor() { this.db = new PrismaClient() }

  async getSchedulesByUsername(username) {
    const manager = await this.db.manager.findUnique({ data: { username }, include: { schedules: true } });
    return manager.schedules;
  }
};

export const scheduleListService = new ScheduleListService();