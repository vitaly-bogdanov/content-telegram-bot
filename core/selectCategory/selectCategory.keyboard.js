import { SCHEDULE_ACTION_NAME } from '../schedule/index.js';

export const selectCategoryKeyboard = (times, scheduleId, dayName) => {
  
  const buttons = times.reduce((memo, time) => {
    memo.push([{ text: time.category ? time.category.title : 'Категория не назначенна', callback_data: 'ffdfdf' }]);
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
  };
}
