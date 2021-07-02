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
          cron.schedule(`0 19 5 * * *`, async () => {
            await schedulerService.updateManegerContent(managerId, randomContent.id);
            reloadManagerContentEmmiter.emit(`reload${telegramId}`);
          });

          // let res = await fetch(`https://api.telegram.org/bot${process.env.ADMIN_BOT_TOKEN}/getFile?file_id=${randomContent.data}`);
          // let data = await res.json();
          // let file_path = data.result.file_path;
          // let pic = await fetch(`https://api.telegram.org/file/bot${process.env.ADMIN_BOT_TOKEN}/${file_path}`);
          // let buffer = pic.body._readableState.buffer.tail.data;
          // cron.schedule(`0 54 2 * * *`, async () => {
          //   switch (randomContent.format) {
          //     case 'document':
          //       bot.sendDocument(telegramId, buffer, schedulerKeyboard);
          //       break;
          //     case 'photo':
          //       bot.sendPhoto(telegramId, buffer, schedulerKeyboard);
          //       break;
          //     case 'audio':
          //       bot.sendAudio(telegramId, buffer, schedulerKeyboard);
          //       break;
          //     case 'video':
          //       bot.sendVideo(telegramId, buffer, schedulerKeyboard);
          //       break;
          //     case 'text':
          //       bot.sendMessage(telegramId, randomContent.data);
          //   }
          // }, scheduleConfig);
        }
      });
    });
  }, scheduleConfig);
};