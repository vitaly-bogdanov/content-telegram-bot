import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class ScheduleService {
  constructor() { this.db = new PrismaClient() }

  async getTimesByManagerTelegramIdAndDayName() {
    
  }
}

export const scheduleService = new ScheduleService();