import cron from 'node-cron';
import dotenv from 'dotenv';

import { schedulerService } from './scheduler.service.js';
import { getTodaysNumberHelper, getRandomIntFromIntervalHoursAdnMinutes } from './scheduler.helpers.js';
import { reloadManagerContentEmmiter } from './scheduler.emmiter.js';

dotenv.config();

const scheduleConfig = { timezone: process.env.SCHEDULER_TIME_ZONE, scheduled: true };

export const startScheduler = (bot) => {
  cron.schedule('0 18 5 * * *', async () => {
    let dayNumber = getTodaysNumberHelper();
    let schedules = await schedulerService.getTodaysSchedules(dayNumber);
    schedules.forEach((schedule) => {
      let telegramId = schedule.manager.telegram_id;
      let managerId = schedule.manager.id;
      schedule.times.filter((time) => time.categoryId).forEach(async (time) => {
        let randomContent = await schedulerService.getRandomContentByTimeId(time.id);
        const { randomHours, randomMinutes } = getRandomIntFromIntervalHoursAdnMinutes(time.value);
        if (randomContent) {
          cron.schedule(`0 ${randomMinutes} ${randomHours} * * *`, async () => {
            await schedulerService.updateManegerContent(managerId, randomContent.id);
            reloadManagerContentEmmiter.emit(`reload${telegramId}`);
          }, scheduleConfig);
        }
      });
    });
  }, scheduleConfig);
};