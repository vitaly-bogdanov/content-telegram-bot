import { SCHEDULE_ACTION_NAME } from '../schedule/index.js';
import { CHANGE_CATEGORY_ACTION_NAME } from '../changeСategory/index.js';

export const selectCategoryKeyboard = (times, scheduleId, managerId) => {
  
  const buttons = times.reduce((memo, time) => {
    memo.push([{ text: time.category ? time.category.title : 'Категория не назначенна', callback_data: `${CHANGE_CATEGORY_ACTION_NAME}?scheduleId=${scheduleId}&timeId=${time.id}&&managerId=${managerId}` }]);
    return memo;
  }, []);

  return {
    reply_markup: {
      inline_keyboard: [
        ...buttons,
        [
          { text: 'Назад 🔙', callback_data: `${SCHEDULE_ACTION_NAME}?scheduleId=${scheduleId}&managerId=${managerId}` }
        ]
      ]
    }
  };
}
