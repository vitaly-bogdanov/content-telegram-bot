import { TIME_LIST_ACTION_NAME } from '../timeList/index.js';
import { SELECT_CATEGORY_ACTION_NAME } from '../selectCategory/index.js';

export const scheduleKeyboard = (scheduleId, dayName) => ({
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Изменить время ⏰', callback_data: `${TIME_LIST_ACTION_NAME}?scheduleId=${scheduleId}&dayName=${dayName}` }
      ],
      [
        { text: 'Изменить категории 🗂', callback_data: `${SELECT_CATEGORY_ACTION_NAME}?scheduleId=${scheduleId}&dayName=${dayName}` }
      ],
      [
        { text: 'Назад 🔙', callback_data: 'sddds' }
      ]
    ]
  }
});