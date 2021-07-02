import { TIME_LIST_ACTION_NAME } from '../timeList/index.js';
import { SELECT_CATEGORY_ACTION_NAME } from '../selectCategory/index.js';
import { SCHEDULE_LIST_ACTION_NAME } from '../scheduleList/index.js';

export const scheduleKeyboard = (scheduleId, dayName, managerId, telegramId) => ({
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Изменить время ⏰', callback_data: `${TIME_LIST_ACTION_NAME}?scheduleId=${scheduleId}&managerId=${managerId}` }
      ],
      [
        { text: 'Изменить категории 🗂', callback_data: `${SELECT_CATEGORY_ACTION_NAME}?scheduleId=${scheduleId}&managerId=${managerId}` }
      ],
      [
        { text: 'Назад 🔙', callback_data: `${SCHEDULE_LIST_ACTION_NAME}?managerId=${managerId}&telegramId=${telegramId}` }
      ]
    ]
  }
});