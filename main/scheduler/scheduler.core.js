import cron from 'node-cron';
import dotenv from 'dotenv';

import { schedulerService } from './scheduler.service.js';
import { getTodaysNumberHelper, getRandomIntFromIntervalHoursAdnMinutes } from './scheduler.helpers.js';

dotenv.config();

const scheduleConfig = { timezone: process.env.SCHEDULER_TIME_ZONE, scheduled: true };

export const startScheduler = () => {
  cron.schedule('0 43 0 * * *', async () => {
    let dayNumber = getTodaysNumberHelper();
    let schedules = await schedulerService.getTodaysSchedules(dayNumber);
    schedules.forEach((schedule) => {
      let telegramId = schedule.manager.telegram_id;
      schedule.times.filter((time) => time.categoryId).forEach(async (time) => {

        let randomContent = await schedulerService.getRandomContentByTimeId(time.id);

        console.log(randomContent);

        const { randomHours, randomMinutes } = getRandomIntFromIntervalHoursAdnMinutes(time.value);
        cron.schedule(`0 48 22 * * *`, async () => {
          managerBot.sendMessage(telegramId, 'hello')
        }, scheduleConfig);
      });
    });
  }, scheduleConfig);
};