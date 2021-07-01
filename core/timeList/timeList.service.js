import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class TimeListService {
  constructor() { this.db = new PrismaClient() }

  async getTimesByScheduleId(scheduleId) {
    return await this.db.time.findMany({ where: { scheduleId: +scheduleId }, orderBy: { id: 'asc' } });
  }

};

export const timeListService = new TimeListService();