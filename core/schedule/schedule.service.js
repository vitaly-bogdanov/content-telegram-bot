import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class ScheduleService {
  constructor() { this.db = new PrismaClient() }

  async getTimesByScheduleId(scheduleId) {
    return this.db.time.findMany({ where: { scheduleId: +scheduleId }, include: { category: true }, orderBy: { id: 'asc' } });
  }

  async getManagerTelegramIdById(id) {
    const manager = await this.db.manager.findUnique({ where: { id: +id }, select: { telegram_id: true } });
    return manager.telegram_id;
  }

  async getScheduleDayNameById(id) {
    const schedule = await this.db.schedule.findUnique({ where: { id: +id }, select: { dayName: true } });
    return schedule.dayName;
  }

}

export const scheduleService = new ScheduleService();