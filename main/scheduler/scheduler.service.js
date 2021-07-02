import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class SchedulerService {
  constructor() { this.db = new PrismaClient() }

  async getTodaysSchedules(dayNumber) {
    return this.db.schedule.findMany({ where: { dayNumber }, include: { times: true, manager: true } });
  }

  async getRandomContentByTimeId(timeId) {
    let time = await this.db.time.findUnique({ where: { id: timeId }, include: { category: true } });    
    let contents = await this.db.content.findMany({ where: { categoryId: time.category.id } });
    return this.#getRandomContent(contents);
  }

  async updateManegerContent(managerId, contentId) {
    return await this.db.managerContent.create({ data: { managerId, contentId } });
  }

  #getRandomContent(contents) {
    return contents[Math.floor(Math.random() * contents.length)]
  }
}

export const schedulerService = new SchedulerService();