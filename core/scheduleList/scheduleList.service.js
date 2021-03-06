import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class ScheduleListService {
  
  constructor() { this.db = new PrismaClient() }

  async getScheduleByManagerId(managerId) {
    return await this.db.schedule.findMany({ where: { managerId: +managerId }, orderBy: { id: 'asc' } });
  }

  async getSchedulesByUsername(username) {
    const manager = await this.db.manager.findUnique({ where: { username }, include: { schedules: true } });
    return manager.schedules;
  }

  async getManagerTelegramIdByUsername(username) {
    const manager = await this.db.manager.findUnique({ where: { username }, select: { telegram_id: true } });
    return manager.telegram_id;
  }

};

export const scheduleListService = new ScheduleListService();