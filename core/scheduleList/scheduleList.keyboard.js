import { MAILING_ACTION_NAME } from '../mailing/index.js';
import { SCHEDULE_ACTION_NAME } from '../schedule/index.js';

export const scheduleListKeyboard = (schedules, managerId, telegramId) => { 
  const buttons = schedules.reduce((memo, schedule) => {
    memo.push([{ text: `${schedule.dayName}`, callback_data: `${SCHEDULE_ACTION_NAME}?scheduleId=${schedule.id}&managerId=${managerId}` }])
    return memo;
  }, []);
  return {
    reply_markup: {
      inline_keyboard: [
        ...buttons,
        [
          { text: 'Назад 🔙', callback_data: MAILING_ACTION_NAME }
        ]
      ]
    }
  }
};