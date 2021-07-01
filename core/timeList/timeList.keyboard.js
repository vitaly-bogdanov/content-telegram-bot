import { TIME_ACTION_NAME } from '../time/index.js';
import { SCHEDULE_ACTION_NAME } from '../schedule/index.js';

export const timeKeyboard = (times, scheduleId, dayName) => {
  
  const buttons = times.reduce((memo, time) => {
    memo.push([{ text: time.value, callback_data: `${TIME_ACTION_NAME}?timeId=${time.id}` }]);
    return memo;
  }, []);

  return {
    reply_markup: {
      inline_keyboard: [
        ...buttons,
        [
          { text: 'Назад 🔙', callback_data: `${SCHEDULE_ACTION_NAME}?scheduleId=${scheduleId}&dayName=${dayName}` }
        ]
      ]
    }
  }

};