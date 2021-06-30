import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class ScheduleService {
  constructor() { this.db = new PrismaClient() }

  async getTimesByManagerTelegramIdAndDayName(managerTelegramId, dayName) {
    const manager = await this.db.manager.findUnique({ where: { telegram_id: managerTelegramId }, include: { schedules: true } });
    let schedule = manager.schedules.find(schedule => schedule.dayName === dayName);
    const times = (await this.db.schedule.findUnique({ where: { id: schedule.id }, include: { times: true } })).times;
    return times;
  }

  async getSheduleId(managerTelegramId, dayName) {
    const manager = await this.db.manager.findUnique({ where: { telegram_id: managerTelegramId }, include: { schedules: true } });
    let schedule = manager.schedules.find(schedule => schedule.dayName === dayName);
    return schedule.id;
  }

}

export const scheduleService = new ScheduleService();