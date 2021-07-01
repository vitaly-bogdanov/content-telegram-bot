import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class ScheduleService {
  constructor() { this.db = new PrismaClient() }

  async getTimesByScheduleId(scheduleId) {
    return this.db.time.findMany({ where: { scheduleId: +scheduleId }, orderBy: { id: 'asc' } });
  }

}

export const scheduleService = new ScheduleService();