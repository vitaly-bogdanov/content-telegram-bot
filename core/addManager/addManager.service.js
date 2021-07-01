import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

class AddManagerService {
  
  constructor() { 
    this.db = new PrismaClient();
    this.initialTimes = [
      { value: '10:00-11:25' },
      { value: '10:00-11:25' },
      { value: '14:00-15:00' },
      { value: '16:00-17:00' },
      { value: '18:00-19:00' },
      { value: '20:00-21:00' },
      { value: '22:00-23:00' }
    ];
  }

  async confirmedByTelegramId(telegram_id) {
    return await this.db.manager.update({
      where: { telegram_id }, 
      data: { 
        confirmed: true, 
        schedules: {
          create: [
            { dayNumber: 1, dayName: 'Понедельник', times: { create: this.initialTimes } },
            { dayNumber: 2, dayName: 'Вторник', times: { create: this.initialTimes } },
            { dayNumber: 3, dayName: 'Среда', times: { create: this.initialTimes } },
            { dayNumber: 4, dayName: 'Четверг', times: { create: this.initialTimes } },
            { dayNumber: 5, dayName: 'Пятница', times: { create: this.initialTimes } },
            { dayNumber: 6, dayName: 'Суббота', times: { create: this.initialTimes } },
            { dayNumber: 7, dayName: 'Воскресенье', times: { create: this.initialTimes } }
          ]
        }
      } 
    });
  }

  async isManagerRegistered(telegram_id) {
    return !!(await this.#findManagerByTelegramId(telegram_id));
  }

  async #findManagerByTelegramId(telegram_id) {
    return await this.db.manager.findUnique({ where: { telegram_id } })
  }

};

export const addManagerService = new AddManagerService();